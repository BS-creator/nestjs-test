import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Domain } from "src/schemas/domain.schema";
import { DomainService } from "src/services/domain.service";

@Controller('domain')
export class DomainController {
    constructor(private readonly domainService: DomainService) { }

    @Post()
    async createDomain(@Res() response, @Body() domain: Domain) {
        const newDomain = await this.domainService.create(domain);
        return response.status(HttpStatus.CREATED).json({
            newDomain
        })
    }

    @Get()
    async fetchAll(@Res() response) {
        const domains = await this.domainService.readAll();
        return response.status(HttpStatus.OK).json({
            domains
        })
    }

    @Put('/:id')
    async update(@Res() response, @Param('id') id, @Body() domain: Domain) {
        const updatedDomain = await this.domainService.update(id, domain);
        return response.status(HttpStatus.OK).json({
            updatedDomain
        })
    }

    @Get('/byOwner/:ownerId')
    async findByOwnerId(@Res() response, @Param('ownerId') ownerId) {
        const domains = await this.domainService.readByOwnerId(ownerId);
        return response.status(HttpStatus.OK).json({
            domains
        })
    }

    @Get('/search')
    async search(@Res() response, @Query('q') qString) {
        const domains = await this.domainService.search(qString);
        return response.status(HttpStatus.OK).json({
            domains
        })
    }
}

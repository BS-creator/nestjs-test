import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Domain, DomainDocument } from "src/schemas/domain.schema";

const escapeRegex = (text: String) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

@Injectable()
export class DomainService {

    constructor(@InjectModel(Domain.name) private domainModel: Model<DomainDocument>) { }

    async create(domain: Domain): Promise<Domain> {
        const newDomain = new this.domainModel(domain);
        return newDomain.save();
    }

    async readAll(): Promise<Domain[]> {
        return await this.domainModel.find({}, {}, { limit: 10 }).exec();
    }

    async readByOwnerId(ownerId): Promise<Domain[]> {
        return await this.domainModel.find({ ownerId: ownerId }).exec();
    }

    async search(qString): Promise<Domain[]> {
        const regex = new RegExp(escapeRegex(qString), 'gi');
        return await this.domainModel.find({ domainName: regex }).exec();
    }

    async update(id, domain: Domain): Promise<Domain> {
        return await this.domainModel.findByIdAndUpdate(id, domain, { new: true })
    }
}
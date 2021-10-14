import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainController } from './controllers/domain.controller';
import { Domain, DomainSchema } from './schemas/domain.schema';
import { DomainService } from './services/domain.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/demo'),
  MongooseModule.forFeature([{ name: Domain.name, schema: DomainSchema }])],
  controllers: [AppController, DomainController],
  providers: [AppService, DomainService],
})
export class AppModule { }

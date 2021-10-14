import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DomainDocument = Domain & Document;

@Schema()
export class Domain {

    @Prop({
        required: [true, 'Domain name must be defined'],
        unique: [true, 'Domain name must be unique'],
        type: String,
    })
    domainName: string;

    @Prop({ required: true })
    ownerName: string;

    @Prop({ required: true })
    ownerId: string;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);

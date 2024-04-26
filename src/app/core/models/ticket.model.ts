import { Place } from "./Place.model";
import { Price } from "./price.model";
import { TrancheAge } from "./tranche-age.model";
import { TypeTicket } from "./type-ticket.model";

export class Ticket {
    idTicket?: number;
    refTicket?: string;
    disponibility?: boolean;
    expireDate?: Date;
    typeTicket?: TypeTicket;
    places?: Place;
    price?: Price;
    selectedTrancheAge?: TrancheAge;
    qrCodeBase64?: string;
    Scanned?: boolean ;
}  

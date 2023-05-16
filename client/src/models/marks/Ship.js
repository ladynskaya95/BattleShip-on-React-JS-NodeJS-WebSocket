import { Mark } from "./Mark";

export class Ship extends Mark {
     constructor(cell) {
        super(cell) 
        this.logo = null
        this.color = "grey"
        this.name = "ship" 
}}
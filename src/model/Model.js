import { classEvent } from "../util/classEvent";

export class Model extends classEvent{

    constructor(){

        super();

        this._data = {}


    }

    fromJSON(json){

        this._data = Object.assign(this._data, json)
        this.trigger('datachange', this.toJSON())

    }

    toJSON(){

        return this._data


    }


}
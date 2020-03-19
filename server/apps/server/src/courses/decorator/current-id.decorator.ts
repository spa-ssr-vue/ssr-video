import { createParamDecorator } from "@nestjs/common";


export const CurrentId = createParamDecorator((data, params) => params.id)
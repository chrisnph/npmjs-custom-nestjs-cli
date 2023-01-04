const fs = require("fs");
const shell = require("shelljs");

const addModule = (args) => {
  const argsName = args;

  let lowerCaseArgsName = argsName.charAt(0).toLowerCase() + argsName.slice(1);


  let upperCaseArgsNamePlural = () => {
    let name = argsName.charAt(0).toUpperCase() + argsName.slice(1);
    return name.charAt(name.length - 1) == "s" ? name : name + "s";
  };

  let upperCaseArgsNameSingular = () => {
    let name = argsName.charAt(0).toUpperCase() + argsName.slice(1);

    if (name.charAt(name.length - 1) == "s") {
      name = name.slice(0, -1);
    }

    return name;
  };

  let = lowerCaseArgsNamePlural = () => {
    let name = argsName.charAt(0).toLowerCase() + argsName.slice(1);
    return name.charAt(name.length - 1) == "s" ? name : name + "s";
  };

  let lowerCaseArgsNameSingular =
    upperCaseArgsNameSingular().charAt(0).toLowerCase() +
    upperCaseArgsNameSingular().slice(1);


  // create module root folder
  shell.mkdir(`./src/${lowerCaseArgsNamePlural()}`);


  // START create dtos
  shell.mkdir(`./src/${lowerCaseArgsNamePlural()}/dtos`);

  const dtoBoiler = `import { Field, ObjectType, Int, ID } from "@nestjs/graphql";\n\n@ObjectType()\nexport class ${upperCaseArgsNameSingular()}Type {\n@Field(() => ID)\n  id: string;\n  @Field()\n  readonly name: string;\n  @Field(() => Int)\n  readonly age: number;\n  @Field()\n  readonly owner: string;\n}`;
  fs.writeFileSync(
    `src/${lowerCaseArgsNamePlural()}/dtos/create-${lowerCaseArgsNameSingular}.dto.ts`,
    dtoBoiler
  );
  // END create dtos

  // START create inputs
  shell.mkdir(`./src/${lowerCaseArgsNamePlural()}/inputs`);

  const inputsBoiler = `import { InputType, Field, Int } from '@nestjs/graphql';\n\n@InputType()\n  export class ${upperCaseArgsNameSingular()}Input {\n  @Field()\n  readonly name: string;\n  @Field(() => Int)\n  readonly age: number;\n  @Field()\n  readonly owner: string;\n}`;
  fs.writeFileSync(
    `src/${lowerCaseArgsNamePlural()}/inputs/${lowerCaseArgsNameSingular}.input.ts`,
    inputsBoiler
  );
  // END create inputs

  // START create interface
  shell.mkdir(`./src/${lowerCaseArgsNamePlural()}/interfaces`);

  const interfaceBoiler = `import { Document } from 'mongoose';\n\nexport interface ${upperCaseArgsNameSingular()} extends Document {\n  readonly name: string;\n  readonly age: number;\n  readonly owner: string;\n}`;
  fs.writeFileSync(
    `src/${lowerCaseArgsNamePlural()}/interfaces/${lowerCaseArgsNameSingular}.interface.ts`,
    interfaceBoiler
  );
  // END create interface

  // START create schema
  const schemaBoiler = `import * as mongoose from 'mongoose';\n\nexport const ${upperCaseArgsNameSingular()}Schema = new mongoose.Schema({\n  name: String,\n  age: Number,\n  owner: String,\n});`;
  fs.writeFileSync(
    `src/${lowerCaseArgsNamePlural()}/${lowerCaseArgsNamePlural()}.schema.ts`,
    schemaBoiler
  );
  // END create schema

  // START create module
  const moduleBoiler = `import { Module } from '@nestjs/common';\nimport { ${upperCaseArgsNamePlural()}Service } from './${lowerCaseArgsNamePlural()}.service';\nimport { ${upperCaseArgsNamePlural()}Resolver } from './${lowerCaseArgsNamePlural()}.resolver';\nimport { MongooseModule } from '@nestjs/mongoose';\nimport { ${upperCaseArgsNameSingular()}Schema } from './${lowerCaseArgsNamePlural()}.schema';\n\n@Module({\n  imports: [MongooseModule.forFeature([{ name: '${upperCaseArgsNameSingular()}', schema: ${upperCaseArgsNameSingular()}Schema }])],\n  providers: [${upperCaseArgsNamePlural()}Resolver, ${upperCaseArgsNamePlural()}Service],\n})\nexport class ${upperCaseArgsNamePlural()}Module {}`;
  fs.writeFileSync(
    `src/${lowerCaseArgsNamePlural()}/${lowerCaseArgsNamePlural()}.module.ts`,
    moduleBoiler
  );
  // END create module

  // START create resolver
  const resolverBoiler = `import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';\nimport { ${upperCaseArgsNamePlural()}Service } from './${lowerCaseArgsNamePlural()}.service';\nimport { ${upperCaseArgsNameSingular()}Type } from './dtos/create-${lowerCaseArgsNameSingular}.dto';\nimport { ${upperCaseArgsNameSingular()}Input } from './inputs/${lowerCaseArgsNameSingular}.input';\n\n@Resolver()\nexport class ${upperCaseArgsNamePlural()}Resolver {\n  constructor(private readonly ${lowerCaseArgsNamePlural()}Service: ${upperCaseArgsNamePlural()}Service) {}\n\n  @Query(() => [${upperCaseArgsNameSingular()}Type])\n  async ${lowerCaseArgsNamePlural()}() {\n    return this.${lowerCaseArgsNamePlural()}Service.findAll();\n  }\n\n  @Mutation(() => ${upperCaseArgsNameSingular()}Type)\n  async create${upperCaseArgsNameSingular()}(@Args('input') input: ${upperCaseArgsNameSingular()}Input) {\n    try {\n      return this.${lowerCaseArgsNamePlural()}Service.create(input);\n    } catch (error) {\n      console.error(error.message);\n    }\n  }\n}`;

  fs.writeFileSync(
    `src/${lowerCaseArgsNamePlural()}/${lowerCaseArgsNamePlural()}.resolver.ts`,
    resolverBoiler
  );
  // END create resolver

  // START create service
  const serviceBoiler = `import { Injectable } from '@nestjs/common';\nimport { InjectModel } from '@nestjs/mongoose';\nimport { Model } from 'mongoose';\nimport { ${upperCaseArgsNameSingular()}Input } from './inputs/${lowerCaseArgsNameSingular}.input';\nimport { ${upperCaseArgsNameSingular()} } from './interfaces/${lowerCaseArgsNameSingular}.interface';\n\n@Injectable()\nexport class ${upperCaseArgsNamePlural()}Service {\n  constructor(@InjectModel('${upperCaseArgsNameSingular()}') private readonly ${lowerCaseArgsNameSingular}Model: Model<${upperCaseArgsNameSingular()}>) {}\n\n  async findAll(): Promise<${upperCaseArgsNameSingular()}[]> {\n    return await this.${lowerCaseArgsNameSingular}Model.find().exec();\n  }\n\n  async create(create${upperCaseArgsNameSingular()}Dto: ${upperCaseArgsNameSingular()}Input): Promise<${upperCaseArgsNameSingular()}> {\n    const created${upperCaseArgsNameSingular()} = new this.${lowerCaseArgsNameSingular}Model(create${upperCaseArgsNameSingular()}Dto);\n    return await created${upperCaseArgsNameSingular()}.save();\n  }\n}`;

  fs.writeFileSync(
    `src/${lowerCaseArgsNamePlural()}/${lowerCaseArgsNamePlural()}.service.ts`,
    serviceBoiler
  );
  // END create service
};

module.exports = addModule;

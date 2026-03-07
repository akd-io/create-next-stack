import endent from "endent"
import { runCommand } from "../helpers/run-command"
import { Plugin } from "../plugin"

export const prismaPlugin: Plugin = {
  id: "prisma",
  name: "Prisma",
  description: "Adds support for Prisma",
  active: ({ flags }) => Boolean(flags["prisma"]),
  dependencies: [{ name: "@prisma/client", version: "^4.16.0" }],
  devDependencies: [{ name: "prisma", version: "^4.16.0" }],
  technologies: [
    {
      id: "prisma",
      name: "Prisma",
      description:
        "Prisma is a next-generation ORM for Node.js. It is designed to simplify database access and declaratively define the schema for your database. Prisma replaces traditional ORMs and can be used to build GraphQL servers, REST APIs, microservices & more.",
      links: [
        { title: "Website", url: "https://www.prisma.io/" },
        { title: "Docs", url: "https://www.prisma.io/docs" },
        { title: "GitHub", url: "https://github.com/prisma/prisma" },
      ],
    },
  ],
  steps: [
    {
      id: "setUpPrisma",
      description: "setting up Prisma",
      run: async () => {
        await runCommand("npx", ["prisma", "generate"])
      },
    },
  ],
  addFiles: [
    {
      destination: "prisma/schema.prisma",
      content: endent`
        generator client {
          provider = "prisma-client-js"
        }
        
        datasource db {
          provider = "sqlite"
          url      = "file:./dev.db"
        }
        
        model Todo {
          id        Int      @id @default(autoincrement())
          createdAt DateTime @default(now())
          content   String
        }
      `,
    },
    {
      destination: "prisma/seed.ts",
      content: endent`
        import { Prisma, PrismaClient } from "@prisma/client";

        const prisma = new PrismaClient();
        
        const todoCreateInputs: Prisma.TodoCreateInput[] = [
          { content: "This is a todo" },
          { content: "This is another todo" },
        ];
        
        async function main() {
          console.log(\`Start seeding ...\`);
          for (const todoCreateInput of todoCreateInputs) {
            const todo = await prisma.todo.create({
              data: todoCreateInput,
            });
            console.log(\`Created todo with id: \${todo.id}\`);
          }
          console.log(\`Seeding finished.\`);
        }
        
        main()
          .then(async () => {
            await prisma.$disconnect();
          })
          .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            process.exit(1);
          });      
      `,
    },
  ],
}

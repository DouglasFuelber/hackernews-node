const fs = require('fs');
const path = require('path');

const { PrismaClient } = require('@prisma/client')
const { ApolloServer } = require('apollo-server');

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return await context.prisma.link.findMany()
    },
    link: async (parent, { id }, context) => {
      return await context.prisma.link.findUnique({ where: { id: parseInt(id) } })
    }
  },
  Mutation: {
    post: async (parent, args, context) => {
      const newLink = await context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      })
      return newLink
    },
    updateLink: async (parent, { id, url, description }, context) => {
      await context.prisma.link.update({
        where: { id: parseInt(id) },
        data: {
          url: url,
          description: description,
        },
      })

      return await context.prisma.link.findUnique({ where: { id: parseInt(id) } })
    },
    deleteLink: async (parent, { id }, context) => {
      const link = await context.prisma.link.delete({
        where: { id: parseInt(id) }
      })

      return link;
    }
  }
}

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma,
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
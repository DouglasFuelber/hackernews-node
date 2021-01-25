const fs = require('fs');
const path = require('path');

const { ApolloServer } = require('apollo-server');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, { id }) => { return links.find(link => link.id === id) }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, { id, url, description }) => {
      const linkIndex = links.findIndex(link => link.id === id);

      if (linkIndex == -1)
        return null;

      links[linkIndex].url = url;
      links[linkIndex].description = description;

      return links[linkIndex];
    },
    deleteLink: (parent, { id }) => {
      const linkIndex = links.findIndex(link => link.id === id);

      if (linkIndex == -1)
        return null;

      const link = links[linkIndex];

      links.splice(linkIndex, 1);

      return link;
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const APIURL =
  "https://api.thegraph.com/subgraphs/name/antonyip/badger_community_subgraph6";

let temp = ``;
let blocks = [];
for (let block = 13000000; block <= 13200000; block = block + 100000) {
  temp += `block${block}: setts(block:{number:${block}},where:{id:"0x7e7e112a68d8d2e221e11047a72ffc1065c38e1a"}) {
  	balance
  }\n`;
  blocks.push(block);
}

const tokensQuery = `
{
  ${temp}
}
`;

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

let data = [];

client
  .query({
    query: gql(tokensQuery),
  })
  .then((d) => {
    console.log("Subgraph data: ", d);
    let i = 0;
    for (const block of Object.keys(d["data"])) {
      data.push([blocks[i], Number(d["data"][block][0].balance) / 10 ** 9]);
      i++;
    }
    console.log(data);
  })
  .catch((err) => {
    console.log("Error fetching data: ", err);
  });

export default data;

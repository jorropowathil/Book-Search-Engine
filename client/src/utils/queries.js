import gql from "graphql-tag";

const GET_ME = gql`
{me {
      _id
      email
      username
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;


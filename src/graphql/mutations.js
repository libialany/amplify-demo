export const updateDogi = /* GraphQL */ `
mutation UpdateDogi(
  $input: Float!
  
) {
  updateDogi(input: {id: "1", price: $input}) {
    id
    price
  
  }
}
`;

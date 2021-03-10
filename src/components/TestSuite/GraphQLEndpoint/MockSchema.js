import {gql} from "@apollo/client";
//gql function to parse the query string into a query document.

export const dummyQuery = gql`
query starwars {
  people {
    id 
    name
    birth_year
    films{
        title
   }
  }
}`;


export function StarWars ({name}){
    const {loading, error, data} = useQuery(
    dummyQuery,
    {variables : {name}}
    );
    if (loading) return <p> Loading! </p>
    if (error) return <p> Error ;3 </p>

    return (
        <p>
            {data.people.name} was born in {data.people.year}
            </p>
    )
    
}


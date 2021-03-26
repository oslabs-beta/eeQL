# eeQL
<img width="473" alt="eeql_github copy" src="https://user-images.githubusercontent.com/71619815/112024099-150f2e80-8af1-11eb-80b8-7280bfaa85b3.png">

_"EEQL is a standalone test creation suite that constructs reliable endpoint tests for both GraphQL and RESTful API's."_. 

<br/>

## Installation

Please dive into [eeQL.io](https://www.eeql.io/) to install this application. 

Refer to our [Builds/Resources](https://github.com/oslabs-beta/eeQL/releases) for more information on compatability and previous releases.

<br/>

## Usage
### GETTING STARTED

<br>
<img src="https://user-images.githubusercontent.com/71619815/112514890-01630280-8d53-11eb-9b3d-62931589df36.gif" width="650">
<br>

- Input desired port for proper integration into your project
- Upload a project directory (note: a testing folder will be created if none exists).
- eeQL will automatically create, display and locate testing files within your uploaded project to facilitate reliable test creation.

<br/>

### TEST CREATION

<b> REST </b>
<br>
<img src="https://user-images.githubusercontent.com/71619815/112514915-07f17a00-8d53-11eb-8b11-34cdad7d3754.gif" width="650">
<br>
- Select the REST button
- Select the request method that you plan on testing
- Upload the server file of your project
- Fill out the requested fields within the _Test Builder Module_
- Press the save button to automatically create a Jest-and-Supertest-based REST test !


<b> GRAPHQL </b>
<br>
<img src="https://user-images.githubusercontent.com/71619815/112514948-0f188800-8d53-11eb-9db1-e2ebaea7c6f1.gif" width="650">
<br>
- Select the GraphQL button
- Upload the schema file of your project
- Upload the resolvers file of your project
- Provide a description of the test
- Determine if the operation is a valid or invalid one
- Provide the operation (query/mutation) text
- Determine if the operation is a query or a mutation
- Optionally, provide a mutation object if the operation is a mutation instead of a query
- Press the save button to generate an easyGraphQL-based operation test!


<br/>

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

<br/>

## Contact and Inquiries
[Contact us](contact@eeql.io) for all other issues/inquiries. If you'd like to follow up on updates with eeQL, please check us out [here](https://www.linkedin.com/company/eeql/about/)!

<br/>

## Developers 
[Abu Fofanah](https://www.linkedin.com/in/abu-fofanah/) |
[Jason Speare](https://www.linkedin.com/in/jason-speare/) |
[Kimberley Spicer]( https://www.linkedin.com/in/kimberleyspicer/) |
[Ramtin Khoee](https://www.linkedin.com/in/ramtinkhoee/) |
<br/>

## License
This project is licensed under the [MIT license](https://choosealicense.com/licenses/mit/).



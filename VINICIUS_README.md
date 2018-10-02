# Test FrontEnd to GTC

This test was developed to Greentech Challenge

## Getting Started

This instructions are for project knowledge, since construction until run in your machine.

## Running

After download/clone the project in your machine, just run to see, it's necessary has a text editor to development and Angular CLI installed in your machine.

### Break down into end to end tests

After run in your machine, you can started the validation tests, the form has some validations: In some cases don't  accept null fields, besides email validation, max and min characters and date.

The form only validate, that is, it´s only possible go to next page after fill all requirements the page.


## Deployment

When started the test, I decided did the form in many components, one to validate errors, other with the form structure and other component with register page.Split the code into components causes maintenance become more easy and cohesive programming. Is a good practice build classes with as few line as possible precisely because of these issues. And split the projects in components help in this regard.
P.S. (In my Linkedin I wrote an article that talks about how important the good practice of building small and simple classes is: https://www.linkedin.com/pulse/avoid-regions-vin%C3%ADcius-bernal/)

The form is responsive and can be viewed on any device. It was also done API Google connection to search the address when the user types. (This is a prérequiste of test)

This test was did in Angular CLI and most of the logic with TypeScript Codem, besides being  a react form. (This is other prérequiste of test)
Unit tests have also been performed and are working correctly.

## Authors

* **Vinicius Bernal** - *Initial work* - https://www.linkedin.com/in/vin%C3%ADcius-bernal-19254027/
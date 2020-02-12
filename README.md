# Etsy-Top-Five-Terms
Etsy app that finds the top 5 items for a given shop id. Concepts I could have gone deeper on will be found by searching for "TODO" within the project.


## Exceptions 
- Normally I never include the .env file for security purposes but to give you a better sense of how the app works i'll include it.


## Could of gone deeper TL/DR 
- Turn the app into an API for external/internal use
- Build a stronger regex for better words
- Transform the app into one that reads shop ids from IO
- Add a library to remove ALL HTML entities, currently I removed &quot because it appeared the most in all datasets
- Could have added more unit test cases but I ensured the critical parts were working

# Development/Executing the app
clone the repo
```shell
git clone git@github.com:westl/Etsy-Top-Five-Terms.git
```
change directory
```shell
cd Etsy-Top-Five-Terms/
```
install dependencies
```shell
 npm i
```
run the code! (.env has a list of stores to execute against)
```shell
npm run start
```

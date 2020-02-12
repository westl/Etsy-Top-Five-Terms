import { EtsyService } from './service/EtsyService';
import { config } from './config';

// NOTE: normally I like to leave comments for blocks of code that can't explain themselves
// this whole application will have explanations on areas I could have gone deeper with TODOs but i'll try to keep it simple.

// TODO: Include Express if this app needs to turn into an API that takes developer input to get the top 5 or N terms of any given shop ID
// I broke the main two modules into their own classes in order for their functionality to be reused and composed in other parts of the app or be pulled
// out to different apps
async function main() {
  const storesToCheck = config.ETSY_STORES;
  try {
    for (const shopId of storesToCheck) {
      // TODO: This app could potentially be transformed into one that takes user input from
      // IO and get the top five(default) terms without having to change any engine code.
      const topFiveTerms = await EtsyService.getTopTermsByShopId(shopId);
      console.log(`Top Five Terms For Shop ${shopId}: \n`, topFiveTerms);
    }
  } catch (e) {
    console.error('Something went wrong', e);
  }
}
main();

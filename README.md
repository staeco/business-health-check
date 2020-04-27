# Business Health Check

This project provides a toolkit to call every registered business in a city and perform an automated health check over the phone.

Do you need help performing a health check of your local businesses? [Contact us](mailto:we@stae.co) - we would love to help you out!

## Installation

```sh
git clone https://github.com/staeco/business-health-check
cd business-health-check
yarn
```

## Configuration

- Rename `config/keys.json` to `config/secret-keys.json`
- Create a Twilio account and provide your account ID, access token, and phone number in the `config/secret-keys.json` file.
- (Optional) Record a greeting to open your call with [here](https://online-voice-recorder.com/) and save the file as `static/opening.mp3`. A default recording is available.
  - Our testing indicates people don't like receiving calls from robots and will immediately hang up when hearing one speak - having a human touch at the start of the call improves the response rate.
  - If you don't want this you can delete the `openingAudio` flag from the configuration to skip it.
- Edit the `config/prompt.json` file and update the options for your locality.
## Testing the Call

```sh
yarn test-create-plan <your phone number>
yarn test-execute
```

## Performing a Survey

```sh
yarn download <municipal.systems business export URL>
yarn create-plan
yarn execute
yarn report
yarn finish
```

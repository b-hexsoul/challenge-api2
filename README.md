1. **Create a new reference**
    - Create an API endpoint that accepts an URL input (HTML page) and returns `id`, `url`, and `timestamp` as JSON.
    - Upon successful reference creation, an asynchronous background task should be triggered to fetch data from the input URL.
    - **Note:** This step should return the newly-created reference immediately without waiting for the data to be fetched.
2. **Process the newly-created reference**
    - Your asynchronous background worker will extract the page's `title` and `meta name="description"` and store the result somewhere.
    - You may either associate the result with the reference or update the reference itself.
3. **Make the data available**
    - Create a new API endpoint or overload the same endpoint from step 1 to accept either the reference `id` or the `url` and return the result as JSON.
    - If the data is still being fetched/processed, return an appropriate REST response instead.

## Bonuses
- Validations and error-handlings.
- Page title and description fallbacks. e.g. `h1`, main content, etc.
- Update and/or delete a reference.
- Serverless implementations.

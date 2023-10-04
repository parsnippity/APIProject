
# Brianne Siemsen API Project WIP

A brief description of what this project does and who it's for
## Authors

- [@parsnippity](https://www.github.com/parsnippity)  

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`ANOTHER_API_KEY`


## Deployment

To deploy this project run

```bash
  npm run app
```


## Documentation

[Documentation](https://linktodocumentation)


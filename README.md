# quartz_server
Builds HTML from markdown files using quartz and serves them using nginx.
Periodically checks the git repository specified in the docker environment variable (set in docker-compose.yml) for changes and re-builds if there are any.

## Environment Variables

- `QUARTZ_CONTENT_REPOSITORY_URL` (required): Git repository URL containing markdown content
- `NGINX_SERVER_NAME` (optional, default: `_`): Server name for nginx (e.g., `example.com` or `_` for catch-all)
- `NGINX_BASE_PATH` (optional, default: `/quartz`): Base path for serving content
  - Set to `/quartz` to serve at `https://example.com/quartz/`
  - Set to `/` or empty string to serve at root `https://example.com/`

## Customization
### Layout

To customize the layout, add a `quartz.layout.ts` file to the repository. See [Quartz Layout Documentation](https://quartz.jzhao.xyz/layout) for more information.

## Example Configurations

### Serving with base path (behind reverse proxy)
```yaml
environment:
  QUARTZ_CONTENT_REPOSITORY_URL: https://...
  NGINX_SERVER_NAME: ..
  NGINX_BASE_PATH: /quartz
```

### Serving at root path
```yaml
environment:
  QUARTZ_CONTENT_REPOSITORY_URL: https://...
  NGINX_SERVER_NAME: my-wiki.com
  NGINX_BASE_PATH: /
``` 

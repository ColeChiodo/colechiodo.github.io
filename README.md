# colechiodo.github.io

## Local development

Build and run the image locally:

```sh
docker compose up -d --build
```

The site is served at http://localhost:9050.

## Production setup

Every push to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the Docker image, pushes it to Docker Hub, joins the Tailscale mesh, and SSHes into the server to redeploy. This section covers everything needed for that to work.

### 1. GitHub repository secrets

Add these to **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Purpose |
|---|---|
| `DOCKER_USERNAME` | Docker Hub username (used to log in) |
| `DOCKER_PASSWORD` | Docker Hub password or access token |
| `TS_OAUTH_CLIENT_ID` | Tailscale OAuth client ID |
| `TS_OAUTH_SECRET` | Tailscale OAuth client secret |
| `SERVER_HOST` | Hostname/IP of the server as seen on the mesh (e.g. the Tailscale MagicDNS name like `myserver.tailnet.ts.net`) |
| `SERVER_USERNAME` | SSH username on the server |
| `SSH_PRIVATE_KEY` | SSH private key for the deploy user on the server |

Tailscale OAuth client:
1. Create an OAuth client in the [Tailscale admin console](https://login.tailscale.com/admin/settings/oauth).
2. Check the **tag** `tag:github-actions` so it's authorized to add nodes with that tag (make sure the tag exists and is allowed in ACLs).
3. Use the generated client ID and secret for `TS_OAUTH_CLIENT_ID` / `TS_OAUTH_SECRET`.

### 2. Tailscale

The server must be a node on the same tailnet so the runner can reach it via the mesh. Install Tailscale on the server if you haven't already:

```sh
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

Verify `SERVER_HOST` resolves and is reachable from any machine on the tailnet (`ping <SERVER_HOST>`).

### 3. SSH access

The runner connects to the server with the `appleboy/ssh-action`. Ensure the deploy user on the server has the matching public key in `~/.ssh/authorized_keys`:

```sh
echo "<public key matching SSH_PRIVATE_KEY>" >> ~/.ssh/authorized_keys
```

Test it locally: `ssh -i <private_key> <SERVER_USERNAME>@<SERVER_HOST> echo ok`.

### 4. Server files

Create the `~/scripts` directory on the server and copy the deploy script and a compose file into it:

```sh
mkdir -p ~/scripts
```

Copy the deploy script from this repo (or recreate it) to `~/scripts/deploy-portfolio.sh`:

```sh
cp scripts/deploy-portfolio.sh ~/scripts/deploy-portfolio.sh
chmod +x ~/scripts/deploy-portfolio.sh
```

Copy the production compose file to `~/scripts/docker-compose.yml` (see [compose.prod.example.yml](compose.prod.example.yml)):

```sh
cp compose.prod.example.yml ~/scripts/docker-compose.yml
```

The only thing to configure is the database location. The compose file points `DB_PATH` at `/app/db/db.sqlite` and persists it in the `portfolio-data` volume, so nothing else is required. If you'd rather keep the compose file elsewhere, set the location in `~/.bashrc` on the server:

```sh
echo 'export DEPLOY_COMPOSE_FILE=~/path/to/docker-compose.yml' >> ~/.bashrc
```

### 5. Deploy

```sh
docker compose -f ~/scripts/docker-compose.yml up -d
```

After that, just push to `main` — the workflow builds and pushes the image, then SSHes in and runs `~/scripts/deploy-portfolio.sh`, which pulls the new image and recreates the container.

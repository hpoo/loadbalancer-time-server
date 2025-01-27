

I'll guide you through setting up a GitLab Runner for your CI pipeline. Since your pipeline uses Docker, we'll set up a runner with Docker executor.

Here are the steps to set up a GitLab Runner:

1. **Install GitLab Runner** on your server:
```bash
# For Debian/Ubuntu
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh" | sudo bash
sudo apt-get install gitlab-runner

# For RHEL/CentOS
curl -L "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh" | sudo bash
sudo yum install gitlab-runner
```

2. **Register the runner** with your GitLab instance:
```bash
sudo gitlab-runner register
```

When prompted, enter the following information:
- GitLab instance URL (your self-hosted GitLab URL)
- Registration token (find this in GitLab: Settings > CI/CD > Runners)
- Description (e.g., "docker-runner")
- Tags (optional, e.g., "docker")
- Executor: choose `docker`
- Default Docker image: `docker:20.10.16`

3. **Configure the runner** for Docker-in-Docker support. Edit `/etc/gitlab-runner/config.toml`:
```toml
[[runners]]
  name = "docker-runner"
  url = "YOUR_GITLAB_URL"
  token = "YOUR_RUNNER_TOKEN"
  executor = "docker"
  [runners.docker]
    tls_verify = false
    image = "docker:20.10.16"
    privileged = true
    disable_cache = false
    volumes = ["/cache", "/var/run/docker.sock:/var/run/docker.sock"]
  [runners.cache]
    Shared = true
```

4. **Restart the runner**:
```bash
sudo systemctl restart gitlab-runner
```

5. **Verify installation**:
```bash
sudo gitlab-runner verify
```

Important security considerations:
- The runner needs to run in privileged mode (`privileged = true`) to support Docker-in-Docker
- Mounting `/var/run/docker.sock` gives the runner access to the host's Docker daemon
- Make sure your server has enough resources (CPU, RAM, disk space)
- Consider setting up runner-specific tags to control which jobs it can run

Additional tips:
- Set concurrent job limits in `/etc/gitlab-runner/config.toml` if needed:
```toml
concurrent = 4  # Number of jobs that can run simultaneously
```
- Monitor your runner's resources and logs:
```bash
# Check runner status
sudo gitlab-runner status

# View logs
sudo journalctl -u gitlab-runner
```

Would you like me to provide more details about any specific aspect of the runner setup?

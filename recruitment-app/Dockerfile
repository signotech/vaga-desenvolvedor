FROM node:20-bookworm

WORKDIR /app

ENV NODE_ENV=development
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH="${PNPM_HOME}:${PATH}"

RUN corepack enable

# Leverage Docker layer caching for dependency installation
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev", "--hostname", "0.0.0.0", "--port", "3000"]

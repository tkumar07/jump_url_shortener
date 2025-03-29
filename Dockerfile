# Use the official Elixir image which comes with Erlang pre-installed
FROM elixir:latest

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  libssl-dev \
  libncurses5-dev \
  libstdc++6 \
  git \
  && apt-get clean

# Set the working directory inside the container
WORKDIR /app

# Install Hex and Rebar (Elixir build tools)
RUN mix local.hex --force && mix local.rebar --force

# Copy the Elixir project files into the container
COPY . .

# Install the dependencies
RUN mix deps.get

# Expose port (the default Phoenix port)
EXPOSE 4000

# Run the Phoenix server
CMD ["mix", "phx.server"]

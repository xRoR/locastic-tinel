# Tinel Workshop - Demo app

This project cool webstore for selling workshops

## Stuff I use here

- State:
For state management I use [mobx-state-tree](https://mobx-state-tree.js.org/intro/welcome), it work very well with TS and brilliantly map backend data

- Styling:
For pixelperfect(?ish) :) I often use styled-components, they are easy to maintain and great for dynamic styling.

>I can do similar experience with plain SCSS/CSS and/or Redux + Redux-Thunk

## Delivery

- Docker: 
I use docker swarm + traefik proxy, it`s quick and easy solution. But I can deploy same/similar stack via noserver services ([vercel](https://vercel.com/), etc) or just plain vps 

- Github Actions:
Also add workflow to build images and update deployed stack on swarm


## Run locally

- Via docker: docker-compose up
- Via cli: yarn dev 
> Will run app and mock-backend-server concurrently with one log output
## P.S.

Developers always have huge amounts of silly questions ;) , like: "How does that has to work?", "How do you want to display this thing?", etc. So am I: about carts, do cart items have to be merged or added separately, how the back btn will work on a deeper page (similar workshops), animations, other minor stuff, so I implement all questionable things in my way (not necessarily correct ;) ).Some things like overlays and screenlock I add as opt-in/opt-out props to components.

Some things like overlays and screenlock I add as opt-in/opt-out props to components.

## P.P.S

Known bugs - sometimes modal with keyboard opened acting weird (iOS safari always give us opportunity grow up)
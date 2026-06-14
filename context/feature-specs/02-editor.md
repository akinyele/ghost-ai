We need the base chrom components that frame every editor screen - teh top navbar and the left sidebar shell. These will be resused and extended in every chapter that follows.



### Editor Navbar 

Create `components/editor/editor-navbar.tsx`


Requirements: 

- fixed-height top navbar
- left, center, and right sections
- left section contains sidebar toggle button 
- use `PanelLeftOpen` / `PanelLeftClose` icons based on sidebar state
- right section staty empty for now.
- dark background with suble bottom border



### Project Sidebar

- sidebar should flow above teh editor canvas
- opening it shulud not push page content
- slide in form the left
- accepts `isOpen` prop 
- headeer with `Projects` title + close button
- shadcn `Tabs`: 
    - My Projects
    - Shared
- both tabs show empty placeholder state
- full-width `New Project` button at the bottom with `Plus` icon


### Dialog Pattern

Use the existing color tokens form `global.css` for dialog styling.


Support:

- title
- description
- footer actions

Do not build actual design dialogs yet



### Checks when done

- new components compile without TypeScript errors 
- no line error
- dialog patters is ready for use
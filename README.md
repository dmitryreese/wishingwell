# Install

git clone https://github.com/dmitryreese/wishingwell.git

cd wishingwell

yarn

yarn dev

# Notes

- I'd personally go for either [react-virtualized](https://github.com/bvaughn/react-virtualized) or [react-window](https://github.com/bvaughn/react-window) for production, but both of them seem to not support React 19 currently and a self-written Virtualizer was mentioned as a plus
- Edit mode is activated on cell click, editable columns are marked with a pencil emoji in the header
- Scroll lock while editing is an arguable choice, "remembering" cells in edit mode didn't feel particularly user friendly with 10k rows. Idea: edit entire row in a modal window
- Composition for global state management is the React way (i.e. "Dumb components" + HOC), but I've decided to not go that far for this task
- Returning `prevValue` in `Cell.hooks/useEditing` as is without "copying" it is up for discussion - it's JS and I can get away with it because objects are passed by reference, immutability on the other hand
- No fancy UI
- More than happy to answer any questions in case I forgot something
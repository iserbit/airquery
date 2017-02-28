# Airquery

Airquery is a lightweight Javascript DOM manipulation library that implements only essential function in order to reduce file size and loading speed.

## Usage

### Object Methods

##### `$$`
- Can accept a string selector

  ```
  const heading = $$('h1');
  ```

- Can accept a function to be added as Ready callbacks
  ```
  const status = () => console.log('loaded');
  $$(status);
  ```


##### `extend`
  ```
  ```

##### `ajax`
  ```
  ```

### Manipulation Methods

##### `html`

##### `empty`

##### `remove`

##### `append`

##### `attr`

##### `addClass`

##### `removeClass`

##### `toggleClass`

### Traversal Methods

##### `parent`

##### `children`

##### `find`

### Event Handlers

##### `on`

##### `off`

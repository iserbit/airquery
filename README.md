# Airquery

Airquery is a lightweight Javascript DOM manipulation library that implements only essential function in order to reduce file size and loading speed.

## Usage

### Object Methods

##### `$$`
- Can accept a string selector
  ```javascript
  const heading = $$('h1');
  ```

- Can accept a function to be added as Ready callbacks

  ```javascript
  const status = () => console.log('loaded');
  $$(status);
  ```

##### `extend`
- Merges objects

  ```javascript
  const objA = {a: 'a', b: 'a', c: 'a'};
  const objB = {b: 'b', c: 'b'};
  const objC = {c: 'c'};
  $$.extend(objA, objB, objC); //=> {a: 'a', b: 'b', c: 'c'}
  objA //=> {a: 'a', b: 'b', c: 'c'}
  ```

##### `ajax`
- Creates an asynchronous call and returns a `Promise`

  ```javascript
  const call = $$.ajax({
    method: 'get',
    url: 'http://httpbin.org/',
    success: (res) => console.log('success'),
    error: (res) => console.log('error')
  }).then(
    () => console.log('promise resolved'),
    () => console.log('promise rejected')
  );
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

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
- Creates an asynchronous call and returns a `Promise` object

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

##### `html(string)`
- Sets the content of the element
  ```javascript
  $$('h1').html('Heading 1'); // <h1>Heading 1</h1>
  ```

##### `empty()`
- Empties the content of the element
```javascript
  $$('h1').empty(); // <h1></h1>
```

##### `remove()`
- Removes the element from the document
- Returns the removed DOMNode object
```javascript
  $$('h1').remove();
```

##### `append(string) / append(object)`
- Nests a children element or object to the parent
```javascript
  $$('ul').append('<li>child</li>');

  const parent = $$('ul');
  const child = $$('li');
  parent.append(child);
```

##### `attr(name)` / `attr(name, value)`
- Gets/sets the element attributes
```javascript
  $$('div').attr('pos', '0, 1'); // <div pos='0, 1' />
  $$('div').attr('pos'); // '0, 1'
```

##### `addClass(className)`
- Adds a class to an element
```javascript
  $$('div').addClass('hidden'); // <div class='hidden' />
```

##### `removeClass(className)`
- Removes a class from an element
```javascript
  $$('div').removeClass('hidden'); // <div />
```

##### `toggleClass(className)`
- Toggles a class for an element
```javascript
  $$('div').toggleClass('hidden'); // <div class='hidden' />
  $$('div').toggleClass('hidden'); // <div />
```

### Traversal Methods

##### `parent`
- Returns DOMNode object of the node's parents
```javascript
  $$('li').parent(); // [ul]
```

##### `children`
- Returns DOMNode object of the node's children
```javascript
  $$('ul').children(); // [li, li, li]
```

##### `find`
- Returns a DOMNode of all the nodes matching the selector passed in as an argument that are descendants of the nodes
```javascript
  $$('ul').find('li'); // [li, li, li]
```

### Event Handlers

##### `on(event, callback)`
- Adds an event listener to the element
- Event listeners can be chained
```javascript
  $$('li').on('click', () => console.log('clicked!'))
          .on('hover', () => console.log('hovered!'));
```

##### `off(event)`
- Removes an event listener from the element
```javascript
  $$('li').off('click');
```

jQuery Plugin List Effects
===================

With the jQuery Plugin List Effects you can easily create rotating effects/transitions on list items (also multiple divs on the same child-level).

Example:

Say you have a following list:

    <div id="myList">
        <h4>This is my list</h4>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>
    </div>

And here you want, that the items are highlighted sequentially so that the users can see that they can click on it.
For this effect you want to change the color (to a slight grey => #ccc) for 1 second on each element.

Then you can do this:

```javascript
    jQuery('#myList ul li a').listEffect(
            {delay: 1000, attribute: 'color', value: '#ccc'},
            {type: 'click', method: function(event){
                jQuery('#result').html(this.innerText + ' clicked');
            }}
    );
```


WARNING
===================

This plugin is not well tested, so all there is no liability of usage.

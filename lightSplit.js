'use strict';

var lightSplit = (function() {

  return function(list) {

    var selector = list.selector || 'ul',
        columns = list.columns || '2',
        customClass = list.customClass || 'lightSplit',
        targets = document.querySelectorAll(selector),
        template, templateLists, targetsHeight, targetsClasses, targetsItems;

    for (var i = 0, ilen = targets.length; i < ilen; i += 1) {
      targetsClasses = targets[i].className + ' ' + customClass;
      targetsItems = targets[i].children;
      targetsHeight = parseInt( getComputedStyle(targets[i]).height );
      templateLists = getLists(targetsItems, columns, targetsHeight);
      template = createTemplate(templateLists, targetsClasses);

      targets[i].parentNode.replaceChild(template, targets[i]);
    }
    
    
    function getLists(list, columns, height) {
      var result = [],
          columnCount = 0,
          columnHeight = Math.floor(height / columns),
          tempHeight = 0,
          itemHeight, lastElem, popElement;


      result[columnCount] = [];

      for (var j = 0, jlen = list.length; j < jlen; j += 1) {

        itemHeight = +parseInt( getComputedStyle(list[j]).height );


        if (tempHeight >= columnHeight) {
          columnCount += 1;
          result[columnCount] = [];
          tempHeight = 0;
        }

        tempHeight += itemHeight;
        result[columnCount].push(list[j]);
      }
      while (columnCount != columns - 1) {

        popLastElement();
      }

      function popLastElement() {
        console.log(result[columnCount].length);
        if (result[columnCount].length > 1) {
          lastElem = result[columnCount].pop();

          result[columnCount + 1] = result[columnCount + 1] || [];
          result[columnCount + 1].unshift(lastElem);

          columnCount += 1;
        } else {
          columnCount -= 1;
          popLastElement()
        }
      }

      return result;

    }

    function createTemplate(items, classes) {
      var wrapper = document.createElement('div'),
          ul = document.createElement('ul'),
          li = document.createElement('li');

      li.className = customClass + '_item';
      wrapper.className = classes;

      for (var j = 0, jlen = items.length; j < jlen; j += 1) {
        ul.className = customClass + '_column' + ' is-' + (j + 1);
        for (var k = 0, klen = items[j].length; k < klen; k += 1) {
          li.innerHTML = items[j][k].innerHTML;
          ul.appendChild(li.cloneNode(true));
        }
        wrapper.appendChild(ul.cloneNode(true));
        ul.innerHTML = '';
        ul.className = '';
      }

     return wrapper;
    }

  }

}());
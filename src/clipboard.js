function layout(view) {
  return `
    <!doctype html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">  
        </head>
        <body>
          <div class="w-full max-w-lg">
            <div class="flow-root mt-6 mx-6">
            ${view}
            </div>  
          </div>
        </body>
      </html>
  `
}



export async function clipboardView(){
  const values = await CLIPBOARD.list();  
  if (values.keys.length < 1) return layout("<div>The clipboard is empty</div>")
  const promises = values.keys.map(async n => CLIPBOARD.get(n.name))
  const contentList = await Promise.all(promises)
  return layout(
    ` <ul role="list" class="-my-5 divide-y divide-gray-200">
        ${contentList.map( item => {
            return `
              <li class="py-4">
                <div class="flex items-center space-x-4">            
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">
                      ${item}
                    </p>            
                  </div>
                  <div>
                    <button class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50" onClick="(
                      function(){
                        navigator.clipboard.writeText('${item.replace(/"([^"]+(?="))"/g, '$1')}');          
                        return false;
                      })();return false;">
                      Copy
                    </button>
                  </div>
                </div>
              </li>  
            `
          }).join('\n')
        } 
      </ul>
    `
  )
}
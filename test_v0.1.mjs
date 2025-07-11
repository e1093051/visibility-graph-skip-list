import VisibilityGraph from './visibility-graph/src/VisibilityGraph.js';
import path from 'ngraph.path'
import  * as turf from "@turf/turf"
import fs from 'fs'


const maps = ["continents2"]

// 儲存原本的 console.log
const originalLog = console.log

for (const name of maps) {

  // 讀取 geojson 檔案
  const raw = fs.readFileSync(`./visibility-graph/test/harness/${name}.geojson`)
  const geojson = JSON.parse(raw)

  const csvStream = fs.createWriteStream(`./${name}.csv`, { flags: 'w' })





  
  
  
   // 改寫 console.log，每次寫入一行
  console.log = function (...args) {
    const line = args.map(arg =>
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ')  // 多個參數合併為一欄
    csvStream.write(line + '\n')
  }
    
  
    
    
    
  
  
    


    
    



  const startTime = performance.now()
  const vg = new VisibilityGraph(geojson);
  const endTime = performance.now()
  console.log("initialization done")
  console.log(`Initialization took ${endTime - startTime} milliseconds`)
  // await vg.initialize()
  
  vg.graph.forEachLink(link => {
    console.log('Edge from', link.fromId, 'to', link.toId)
  })
    

  // 強制 flush 並關閉寫入檔案
  csvStream.end()
  // 還原成原本的 console.log
  console.log = originalLog
}
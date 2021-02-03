const PORT = 18382
import express from 'express'
const app = express()
import cors from 'cors'
import os from 'os'
// const gpuInfo = require('gpu-info')
import gpuInfo from '@jedithepro/system-info'

let cpuName = os.cpus()

const info = {
    hostname: os.hostname(),
    type: os.type(),
    platform: os.platform(),
    cpu: cpuName[0].model,
    ram: Math.floor(os.totalmem()),
    uptime: "",
    gpu: ""
}
function tofixed(num: number) {
    return num.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping:false})
}

app.use(cors())

app.get('/', async (_, res) => {
    // gpuInfo().then(data => { _Gpu = data
    //     info.gpu = _Gpu.map(x => x.Name).join('\n')
    //     res.send(info)
    // })
    if (info.gpu == "") {
        info.gpu = (await gpuInfo.graphics()).controllers.map(x => x.model).join('\n')
    }
    info.uptime = os.uptime()
    res.send(info)
    // info.gpu = _Gpu.map(x => x.Name).join('\n')

})

app.listen(PORT,'127.0.0.1' ,() => console.log('Server is now on http://localhost:' + PORT))

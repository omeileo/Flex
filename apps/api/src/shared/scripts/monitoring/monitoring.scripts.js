/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

const os = require('os')
const v8 = require('v8')

/**
 * Get detailed memory metrics of the current process.
 * @returns {object} The memory metrics
 */
function getMemoryMetrics() {
  const used = process.memoryUsage()
  const v8Stats = v8.getHeapStatistics()

  return {
    // System Memory
    totalSystemMemory: Math.round(os.totalmem()),
    freeSystemMemory: Math.round(os.freemem()),

    // Process Memory
    processMemory: {
      rss: Math.round(used.rss),
      heapTotal: Math.round(used.heapTotal),
      heapUsed: Math.round(used.heapUsed),
      external: Math.round(used.external),
      arrayBuffers: Math.round(used.arrayBuffers || 0)
    },

    // V8 Heap Details
    v8Heap: {
      heapSizeLimit: Math.round(v8Stats.heap_size_limit),
      totalAvailable: Math.round(v8Stats.total_available_size),
      totalHeapSize: Math.round(v8Stats.total_heap_size),
      totalPhysicalSize: Math.round(v8Stats.total_physical_size),
      usedHeapSize: Math.round(v8Stats.used_heap_size)
    }
  }
}

/**
 * Log the memory metrics of the current process.
 * @param {string} stage - The stage of the build process.
 */
function logMemoryMetrics(stage) {
  try {
    const metrics = getMemoryMetrics()

    console.log(`
      🧠 BUILD MEMORY METRICS - ${stage} 🧠
      ------------------------
      System Memory:
        → Total: ${formatBytes(metrics.totalSystemMemory)}
        → Free:  ${formatBytes(metrics.freeSystemMemory)}
        → Used:  ${formatBytes(metrics.totalSystemMemory - metrics.freeSystemMemory)}

      Process Memory (This Node Process):
        → RSS (Total Memory):     ${formatBytes(metrics.processMemory.rss)}
        → Heap Total:            ${formatBytes(metrics.processMemory.heapTotal)}
        → Heap Used:            ${formatBytes(metrics.processMemory.heapUsed)}
        → External:             ${formatBytes(metrics.processMemory.external)}
        → Array Buffers:        ${formatBytes(metrics.processMemory.arrayBuffers)}

      V8 Heap Details:
        → Heap Size Limit:      ${formatBytes(metrics.v8Heap.heapSizeLimit)}
        → Total Available:      ${formatBytes(metrics.v8Heap.totalAvailable)}
        → Total Heap Size:      ${formatBytes(metrics.v8Heap.totalHeapSize)}
        → Total Physical Size:  ${formatBytes(metrics.v8Heap.totalPhysicalSize)}
        → Used Heap Size:       ${formatBytes(metrics.v8Heap.usedHeapSize)}
      ------------------------
    `)
  } catch (error) {
    console.error('Failed to log memory metrics:', error)
  }
}

/**
 * Convert bytes to MB or GB depending on size.
 * @param bytes - The number of bytes to convert.
 * @returns The formatted string with appropriate unit (MB or GB).
 */
function formatBytes(bytes, withUnit = true) {
  const mb = bytes / 1024 / 1024

  if (mb >= 1024) {
    const gb = mb / 1024

    return withUnit ? `${gb.toFixed(2)} GB` : gb.toFixed(2)
  } else {
    return withUnit ? `${mb.toFixed(2)} MB` : mb.toFixed(2)
  }
}

/**
 * Start continuous memory monitoring
 * @param stage - The stage to display in logs
 * @returns The interval ID for cleanup
 */
function startContinuousMonitoring(stage = 'During Build') {
  console.log(`👁️👄👁️ Starting continuous memory monitor: ${stage}...`)

  const intervalId = setInterval(() => {
    try {
      logMemoryMetrics(stage)
    } catch (error) {
      console.error('❌ Error logging memory metrics: ', error)
    }
  }, 3000) // log every 3 seconds

  // Handle cleanup on process termination
  process.on('SIGTERM', () => {
    console.log(`🙈 Stopping continuous memory monitor: ${stage}`)
    clearInterval(intervalId)
    process.exit(0)
  })

  process.on('SIGINT', () => {
    console.log(`🙈 Stopping continuous memory monitor (SIGINT): ${stage}`)
    clearInterval(intervalId)
    process.exit(0)
  })

  return intervalId
}

// For command line usage
if (require.main === module) {
  const stage = process.argv[2]
  const isContinuousMonitoring = process.argv[3] === '--continuous'

  if (isContinuousMonitoring) {
    startContinuousMonitoring(stage)
  } else {
    logMemoryMetrics(stage)
  }
}

module.exports = {
  getMemoryMetrics,
  logMemoryMetrics,
  startContinuousMonitoring
}

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold text-indigo-700 mb-4">Historical Timeline (With Brushing)</h1>
    <svg ref="svg" class="w-full h-[450px] rounded shadow-md border border-indigo-200 bg-white" />
    <div id="empty-message" class="text-gray-400 mt-4 text-sm" style="display: none;">
      No data available for the selected range.
    </div>
    <button @click="resetBrush" class="mt-4 text-sm text-blue-600 underline">Reset Selection</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl
const svg = ref(null)
let brushG = null
let x2 = null
let dots = null

onMounted(async () => {
  try {
    const response = await $fetch(`${apiUrl}/items/arifact`)
    const data = response?.data || []

    const parsedData = data
      .map(d => ({
        ...d,
        date: new Date(d.date)
      }))
      .sort((a, b) => a.date - b.date)

    drawTimeline(parsedData)
  } catch (err) {
    console.error('Failed to fetch timeline data:', err)
  }
})

function drawTimeline(data) {
  const svgEl = d3.select(svg.value)
  const width = svg.value.clientWidth
  const height = svg.value.clientHeight
  svgEl.selectAll("*").remove()

  const margin = { top: 20, right: 20, bottom: 110, left: 60 }
  const focusHeight = height - 150
  const contextHeight = 60
  const brushMargin = { top: height - contextHeight - 30 }

  const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width - margin.left - margin.right])

  x2 = d3.scaleTime().domain(x.domain()).range(x.range())

  const y = d3.scalePoint()
    .domain(data.map(d => d.title))
    .range([0, focusHeight - margin.top])
    .padding(1)

  const svgContainer = svgEl.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

  const tooltip = d3.select(svg.value.parentElement)
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "#fff")
    .style("padding", "6px 12px")
    .style("border-radius", "6px")
    .style("box-shadow", "0 2px 8px rgba(0,0,0,0.1)")
    .style("pointer-events", "none")
    .style("display", "none")

  const focus = svgContainer.append("g")

  focus.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${focusHeight})`)
    .call(d3.axisBottom(x).ticks(6))

  focus.append("g")
    .call(d3.axisLeft(y))

  dots = focus.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.date))
    .attr("cy", d => y(d.title))
    .attr("r", 6)
    .attr("fill", "#3b82f6")
    .attr("stroke", "#e0f2fe")
    .attr("stroke-width", 2)
    .on("mouseover", (event, d) => {
      tooltip.style("display", "block")
        .html(`<strong>${d.date.getFullYear()}</strong><br/>${d.title}`)
    })
    .on("mousemove", event => {
      tooltip.style("left", event.pageX + 15 + "px")
        .style("top", event.pageY - 28 + "px")
    })
    .on("mouseout", () => {
      tooltip.style("display", "none")
    })

  const context = svgContainer.append("g")
    .attr("transform", `translate(0, ${brushMargin.top})`)

  context.append("g")
    .attr("class", "x-axis-context")
    .attr("transform", `translate(0, ${contextHeight})`)
    .call(d3.axisBottom(x2).ticks(6))

  context.selectAll("rect")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x2(d.date))
    .attr("cy", contextHeight / 2)
    .attr("r", 3)
    .attr("fill", "#6b7280")

  const brush = d3.brushX()
    .extent([[0, 0], [width - margin.left - margin.right, contextHeight]])
    .on("brush end", brushed)

  brushG = context.append("g")
    .attr("class", "brush")
    .call(brush)
    .call(brush.move, x.range())

  function brushed({ selection }) {
    if (!selection) return
    const [x0, x1] = selection.map(x2.invert)
    x.domain([x0, x1])
    focus.select(".x-axis").call(d3.axisBottom(x).ticks(6))
    let visibleCount = 0
    dots.attr("cx", d => x(d.date))
      .attr("visibility", d => {
        const visible = d.date >= x0 && d.date <= x1
        if (visible) visibleCount++
        return visible ? "visible" : "hidden"
      })
    d3.select("#empty-message").style("display", visibleCount === 0 ? "block" : "none")
  }
}

function resetBrush() {
  const width = svg.value.clientWidth
  if (brushG && x2) {
    const fullRange = x2.range()
    brushG.call(d3.brushX().move, fullRange)
  }
  if (dots) {
    dots.attr("visibility", "visible")
  }
  const axis = d3.select(svg.value).select(".x-axis")
  if (axis.node() && x2) {
    axis.call(d3.axisBottom(x2).ticks(6))
  }
  d3.select("#empty-message").style("display", "none")
}
</script>

<style scoped>
svg {
  background-color: #f9fafb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.tooltip {
  font-size: 0.875rem;
  color: #1f2937;
  z-index: 50;
}
</style>

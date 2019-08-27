<!-- jolt-dashboard/src/components/merchants/MerchantAnalytics.vue -->

<script>
import VueCharts from 'vue-chartjs'
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['Free Dates Offered', 'Free Dates Accepted', 'Dates Visited', 'Swipe AD Clicks', 'Explore Clicks'],
      datasets: [
        {
          label: 'Analytics',
          backgroundColor: ['#9370DB', '#8A2BE2', '#9400D3', '#9932CC', '#8B008B'],
          data: [40, 20, 12, 39, 15]
        }
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false,
    })
  }
}
</script>

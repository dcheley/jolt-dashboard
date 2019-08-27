<!-- jolt-dashboard/src/components/merchants/MerchantOffers.vue -->

<!-- <template> -->
  <!-- Calendar view with offer forms in days -->
<!-- </template> -->

<script>
export default {
  name: 'MerchantOffers',
  data () {
    return {
      merchant: '',
      offers: [],
      error: '',
      editedOffer: '',
      toastCount: 0,
      boxOne: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      var merchantId = this.$route.params.id
      this.$http.secured.get('/api/v1/merchants/' + merchantId + '/offers')
        .then(response => { this.offers = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.$http.secured.get('/api/v1/merchants/' + merchantId)
        .then(response => { this.merchant = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addOffer () {
      const value = this.newOffer
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/offers/', { offer: { title: this.newOffer.title, dollar_value: this.newOffer.dollar_value, expiary_date: this.newOffer.expiary_date, merchant_id: this.newOffer.merchant } })
        .then(response => {
          this.offers.push(response.data)
          this.newOffer = ''
          this.toastCount++
          this.$bvToast.toast(`Scroll down to view Offer's details`, {
            title: 'Success!',
            autoHideDelay: 5000,
            appendToast: true,
            variant: 'success'
          })
        })
        .catch(error => this.setError(error, 'Cannot create offer'))
    },
    removeOffer (offer) {
      this.$http.secured.delete(`/api/v1/offers/${offer.id}`)
        .then(response => {
          this.offers.splice(this.offers.indexOf(offer), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete offer'))
    },
    confirmDelete (offer) {
      this.boxOne = ''
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this offer?', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          this.boxOne = value
          if (this.boxOne === true) {
            this.removeOffer(offer)
          }
        })
    },
    editOffer (offer) {
      this.editedOffer = offer
    },
    updateOffer (offer) {
      this.editedOffer = ''
      this.$http.secured.patch(`/api/v1/offers/${offer.id}`, { offer: { title: offer.title, dollar_value: offer.dollar_value, expiary_date: offer.expiary_date, merchant_id: offer.merchant } })
        .catch(error => this.setError(error, 'Cannot update offer'))
    },
    closeForm (offer) {
      this.editedOffer = ''
    }
  }
}
</script>

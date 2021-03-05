import Swal from 'sweetalert2'

export default class NotificationService {
  static async confirmAction(title = 'Are you sure?', text = "You won't be able to revert this!") {
    try {
      const res = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      console.log(res)
      if (res.isConfirmed) {
        return true
      }
      return false
    } catch (error) {
      console.error(error)
    }
  }

  static async alert() {
    const res = await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong, please provide a valid address!',
      footer: '<a href class="text-dark">Why do I have this issue?</a>'
    })
    if (res.isConfirmed) {
      console.log(res.isConfirmed)
      return true
    }
    return false
  }

  static toast(title = 'Default Toasty', display = 'success') {
    // @ts-ignore
    Swal.fire({
      title: title,
      icon: display,
      position: 'top-right',
      timer: 3000,
      toast: true,
      showConfirmButton: false
      // iconHtml: '<img src="https://media.giphy.com/media/sBQ1lBvDLz476/giphy.gif" style="width:50px; border-radius: 50%">'
    })
  }
}

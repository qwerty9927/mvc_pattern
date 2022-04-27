$(document).ready(function(){
  search_fetch("", "SANPHAM", 1) // Khởi tạo trang đầu
})

function submitAdd(){
  let checkName = 1
  let checkQuantity = 1
  let checkDetail = 1
  let checkCost = 1
  let checkCpu = 1
  let checkRam = 1
  let checkRom = 1
  let checkBrand = 1
  let checkProvider = 1
    let regxUnicode = /[a-zvxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-Z][a-zvxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-Z0-9-_ ]{4,24}/
    let regx = /[a-zA-Z][a-zA-Z0-9-_ ]{2,24}/
    if(!regxUnicode.test($('.form_data input[name = "name"]').val())){
      $('.form_data input[name = "name"] + div span').text("Tên sản phẩm không lợp lệ")
      checkName = 0
    } else {
      $('.form_data input[name = "fullName"] + div span').text("")
      checkName = 1
    }
    if(!regxUnicode.test($('.form_data input[name = "detail"]').val())){
      $('.form_data input[name = "detail"] + div span').text("Không hợp lệ")
      checkDetail = 0
    } else {
      $('.form_data input[name = "detail"] + div span').text("")
      checkDetail = 1
    }


    if(!regx.test($('.form_data input[name = "brand"]').val())){
      $('.form_data input[name = "brand"] + div span').text("Không hợp lệ")
      checkBrand = 0
    } else {
      $('.form_data input[name = "brand"] + div span').text("")
      checkBrand = 1
    }
    if(!regx.test($('.form_data input[name = "cpu"]').val())){
      $('.form_data input[name = "cpu"] + div span').text("Không hợp lệ")
      checkCpu = 0
    } else {
      $('.form_data input[name = "cpu"] + div span').text("")
      checkCpu = 1
    }
    if(!regx.test($('.form_data input[name = "ram"]').val())){
      $('.form_data input[name = "Ram"] + div span').text("Không hợp lệ")
      checkRam = 0
    } else {
      $('.form_data input[name = "ram"] + div span').text("")
      checkRam = 1
    }
    if(!regx.test($('.form_data input[name = "rom"]').val())){
      $('.form_data input[name = "rom"] + div span').text("Không hợp lệ")
      checkRom = 0
    } else {
      $('.form_data input[name = "rom"] + div span').text("")
      checkRom = 1
    }


    if(!/^[1-9][0-9]*$/.test($('.form_data input[name = "quantity"]').val())){
      $('.form_data input[name = "quantity"] + div span').text("Không lợp lệ")
      checkQuantity = 0
    } else {
      $('.form_data input[name = "quantity"] + div span').text("")
      checkQuantity = 1
    }
    if(!/^[1-9][0-9]*$/.test($('.form_data input[name = "cost"]').val())){
      $('.form_data input[name = "cost"] + div span').text("Không lợp lệ")
      checkCost = 0
    } else {
      $('.form_data input[name = "cost"] + div span').text("")
      checkCost = 1
    }
    if($('#select_provider').val() == "0"){
      $('#select_provider + div span').text("Cần lựa chọn")
      checkProvider = 0
    } else {
      $('#select_provider + div span').text("")
      checkProvider = 1
    }
    if(checkName === 1 && checkQuantity === 1 && checkDetail === 1 && checkCost === 1 && checkBrand === 1 && checkProvider === 1 && checkCpu === 1 && checkRam === 1 && checkRom === 1){
      let url
      if($("#file_upload")[0].files[0]){
        url = Math.ceil(Math.random()*10000) + $("#file_upload")[0].files[0].name
      } else {
        url = "default.png"
      }

      if($('#file_upload')[0].files.length != 0){
        let formdata = new FormData()
        if(formdata){
          let file = document.querySelector("#file_upload").files[0]
          formdata.append('image', file)
          $.ajax({
            method: "POST",
            url: `http://localhost/mvc_app/Ajax/upload/${url}`,
            data: formdata,
            processData: false,
            contentType: false
          }).done(function (response){
            console.log(response)
          })
        }
      }

      $.ajax({
        method: "POST",
        url: `http://localhost/mvc_app/Ajax/createData`,
        data: {
          access: "SANPHAM",
          startPoint: (parseInt(localStorage.getItem('page')) - 1) * 10,
          secondAccess: "CHITIETSANPHAM",
          count: $('.form_data input[name = "quantity"]').val(),
          info: {
            idCD: $('.form_data input[name = "code"]').val(),
            TenCD: $('.form_data input[name = "name"]').val(),
            MoTa: $('.form_data input[name = "detail"]').val(),
            SoLuongCD: $('.form_data input[name = "quantity"]').val(),
            Gia: $('.form_data input[name = "cost"]').val(),
            urlHinh: url,
            TenThuongHieu: $('.form_data input[name = "brand"]').val(),
            CPU: $('.form_data input[name = "cpu"]').val(),
            RAM: $('.form_data input[name = "ram"]').val(),
            ROM: $('.form_data input[name = "rom"]').val(),
            MaNCC: $('#select_provider').val()
          }
        }
      }).done(function (response){
          let result = JSON.parse(response)
          console.log(result)
          if(result){
            $('.form_data').fadeOut('slow')
            alert("Tạo thành công")
            location.reload()
          } else {
            alert("Tạo thất bại")
          }
      })
    }
  // })
}

function submitUpdate(){
  let checkName = 1
  let checkQuantity = 1
  let checkDetail = 1
  let checkCost = 1
  let checkCpu = 1
  let checkRam = 1
  let checkRom = 1
  let checkBrand = 1
  let checkProvider = 1
    let regxUnicode = /[a-zvxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-Z][a-zvxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-Z0-9-_ ]{4,24}/
    let regx = /[a-zA-Z][a-zA-Z0-9-_ ]{2,24}/
    if(!regxUnicode.test($('.form_data input[name = "name"]').val())){
      $('.form_data input[name = "name"] + div span').text("Tên sản phẩm không lợp lệ")
      checkName = 0
    } else {
      $('.form_data input[name = "fullName"] + div span').text("")
      checkName = 1
    }
    if(!regxUnicode.test($('.form_data input[name = "detail"]').val())){
      $('.form_data input[name = "detail"] + div span').text("Không hợp lệ")
      checkDetail = 0
    } else {
      $('.form_data input[name = "detail"] + div span').text("")
      checkDetail = 1
    }


    if(!regx.test($('.form_data input[name = "brand"]').val())){
      $('.form_data input[name = "brand"] + div span').text("Không hợp lệ")
      checkBrand = 0
    } else {
      $('.form_data input[name = "brand"] + div span').text("")
      checkBrand = 1
    }
    if(!regx.test($('.form_data input[name = "cpu"]').val())){
      $('.form_data input[name = "cpu"] + div span').text("Không hợp lệ")
      checkCpu = 0
    } else {
      $('.form_data input[name = "cpu"] + div span').text("")
      checkCpu = 1
    }
    if(!regx.test($('.form_data input[name = "ram"]').val())){
      $('.form_data input[name = "Ram"] + div span').text("Không hợp lệ")
      checkRam = 0
    } else {
      $('.form_data input[name = "ram"] + div span').text("")
      checkRam = 1
    }
    if(!regx.test($('.form_data input[name = "rom"]').val())){
      $('.form_data input[name = "rom"] + div span').text("Không hợp lệ")
      checkRom = 0
    } else {
      $('.form_data input[name = "rom"] + div span').text("")
      checkRom = 1
    }



    if(!/^[1-9][0-9]*$/.test($('.form_data input[name = "quantity"]').val())){
      $('.form_data input[name = "quantity"] + div span').text("Không lợp lệ")
      checkQuantity = 0
    } else {
      $('.form_data input[name = "quantity"] + div span').text("")
      checkQuantity = 1
    }
    if(!/^[1-9][0-9]*$/.test($('.form_data input[name = "cost"]').val())){
      $('.form_data input[name = "cost"] + div span').text("Không lợp lệ")
      checkCost = 0
    } else {
      $('.form_data input[name = "cost"] + div span').text("")
      checkCost = 1
    }
    if($('#select_provider').val() == "0"){
      $('#select_provider + div span').text("Cần lựa chọn")
      checkProvider = 0
    } else {
      $('#select_provider + div span').text("")
      checkProvider = 1
    }
    if(checkName === 1 && checkQuantity === 1 && checkDetail === 1 && checkCost === 1 && checkBrand === 1 && checkProvider === 1 && checkCpu === 1 && checkRam === 1 && checkRom === 1){
      let value = $('.form_data input[name = "code"]').val()

      if($("#file_upload")[0].files[0]){
        url = Math.ceil(Math.random()*10000) + $("#file_upload")[0].files[0].name
      } else {
        url = "default.png"
      }

      //upload hình ảnh
      if($('#file_upload')[0].files.length != 0){
        let formdata = new FormData()
        if(formdata){
          let file = document.querySelector("#file_upload").files[0]
          formdata.append('image', file)
          $.ajax({
            method: "POST",
            url: `http://localhost/mvc_app/Ajax/upload/${url}`,
            data: formdata,
            processData: false,
            contentType: false
          }).done(function (response){
            console.log(response)
          })
        }
      }

      // Ghi dữ liệu vào db
      $.ajax({
        method: "POST",
        url: `http://localhost/mvc_app/Ajax/updateData/${value}`,
        data: {
          access: "SANPHAM",
          startPoint: (parseInt(localStorage.getItem('page')) - 1) * 10,
          column: "idCD",
          info: {
            TenCD: $('.form_data input[name = "name"]').val(),
            MoTa: $('.form_data input[name = "detail"]').val(),
            SoLuongCD: $('.form_data input[name = "quantity"]').val(),
            Gia: $('.form_data input[name = "cost"]').val(),
            urlHinh: url,
            TenThuongHieu: $('.form_data input[name = "brand"]').val(),
            CPU: $('.form_data input[name = "cpu"]').val(),
            RAM: $('.form_data input[name = "ram"]').val(),
            ROM: $('.form_data input[name = "rom"]').val(),
            MaNCC: $('#select_provider').val(),
            TrangThai: 1
          }
        }
      }).done(function (response){
          let result = JSON.parse(response)
          console.log(result)
          if(result){
            $('.form_data').fadeOut('slow')
            $('.btn_add').css('display', 'block')
            $('.btn_close_edit').css('display', 'none')
            alert("Sửa thành công")
            location.reload()
          } else {
            alert("Sửa thất bại")
          }
      })
    }
}

function deleteData(access){
  if(confirm("Bạn có muốn xóa!")){
    let value = access.getAttribute('data');
    $.ajax({
      method: "POST",
      url: `http://localhost/mvc_app/Ajax/deleteData/${value}`,
      data: {
        column: "idCD",
        access: "SANPHAM",
        startPoint: (parseInt(localStorage.getItem('page')) - 1) * 10,
        info: {
          TrangThai: 0
        }
      }
    }).done(function (response){
      let result = JSON.parse(response)
      console.log(result)
      if(result){
        alert("Xóa thành công")
        location.reload()
      } else {
        alert("Xóa thất bại vì là tham chiếu khóa ngoại")
      }
    })
  }
}

function imagePreview(subject){
  let url = URL.createObjectURL(subject.files[0])
  $("#image_preview").attr('src', url)
}

function input_edit_sp(subject){
  let id = subject.getAttribute('data')
  let idMaCTSP
  $('.product_data').fadeIn("slow")
  $('.product_data').css('display', 'flex')
  $('.block_add').css('display', 'none')
  $('.btn_action_edit').css('display', 'block')
  $('.btn_action_add').css('display', 'none')
  $('.btn_close_edit').css('display', 'block')
  $('.btn_close_edit').click(function (){
    $('.product_data').fadeOut("slow")
    $('.btn_close_edit').css('display', 'none')
    $('.block_add').css('display', 'block')
  })

  //call Data cho input
  $.ajax({
    method: 'POST',
    url: `http://localhost/mvc_app/Ajax/selectWithCondition/${id}`,
    data: {
      access: "SANPHAM",
      column: "idCD"
    }
  }).done(function (response){
    let result = JSON.parse(response)
    console.log(result)
    idMaCTSP = result['MaCTSP']
    $("input[name = code]").val(result['idCD'])
    $("input[name = name]").val(result['TenCD'])
    $("input[name = detail]").val(result['MoTa'])
    $("input[name = brand]").val(result['TenThuongHieu'])
    $("input[name = cpu]").val(result['CPU'])
    $("input[name = ram]").val(result['RAM'])
    $("input[name = rom]").val(result['ROM'])
    $("input[name = quantity]").val(result['SoLuongCD'])
    $("input[name = cost]").val(result['Gia'])
    $('#image_preview').attr('src', `./public/img/phone/${result['urlHinh']}`)
  })

  //call Data cho dropdown chi tiet san pham (#select_brand)
  // $.ajax({
  //   method: 'POST',
  //   url: `http://localhost/mvc_app/Ajax/selectAll`,
  //   data: {
  //     access: "CHITIETSANPHAM"
  //   }
  // }).done(function (response){
  //   let result = JSON.parse(response)
  //   let string = ""
  //   result.forEach((item) => {
  //     string += `<option value="${item.MaCTSP}">${item.TenThuongHieu}</option>`
  //   })
  //   $("#select_brand").html(string)
  //   $(`#select_brand option[value = ${idMaCTSP}]`).prop('selected', true)
  // })

  //call Data cho dropdown nha cung cap (#select_provider)
  $.ajax({
    method: 'POST',
    url: `http://localhost/mvc_app/Ajax/selectAll`,
    data: {
      access: "NHACUNGCAP"
    }
  }).done(function (response){
    let result = JSON.parse(response)
    let string = ""
    result.forEach((item) => {
      string += `<option value="${item.MaNCC}">${item.Ten}</option>`
    })
    $("#select_provider").html(string)
    $(`#select_provider option[value = ${id}]`).prop('selected', true)
  })
}

function input_add_sp(subject, column){
  $('.product_data').fadeToggle('slow')
  $('.product_data').addClass('row')
  $('.product_data').css('display', 'flex')

  $('.btn_action_add').css('display', 'block')
  $('.btn_action_edit').css('display', 'none')
  $('.product_data input:not(input[name = "code"])').val("")
  $.ajax({
    method: "POST",
    url: 'http://localhost/mvc_app/Ajax/nextCode',
    data: {
      access: subject,
      column: column
    }
  }).done(function (response){
    let result = JSON.parse(response)
    $('.form_data input[name = "code"]').val(result)
  })

  //call Data cho dropdown chi tiet san pham (#select_brand)
  // $.ajax({
  //   method: 'POST',
  //   url: `http://localhost/mvc_app/Ajax/selectAll`,
  //   data: {
  //     access: "CHITIETSANPHAM"
  //   }
  // }).done(function (response){
  //   let result = JSON.parse(response)
  //   let string = "<option value='0'>--Option--</option>"
  //   result.forEach((item) => {
  //     string += `<option value="${item.MaCTSP}">${item.TenThuongHieu}</option>`
  //   })
  //   $("#select_brand").html(string)
  // })

  //call Data cho dropdown nha cung cap (#select_provider)
  $.ajax({
    method: 'POST',
    url: `http://localhost/mvc_app/Ajax/selectAll`,
    data: {
      access: "NHACUNGCAP"
    }
  }).done(function (response){
    let result = JSON.parse(response)
    let string = "<option value='0'>--Option--</option>"
    result.forEach((item) => {
      string += `<option value="${item.MaNCC}">${item.Ten}</option>`
    })
    $("#select_provider").html(string)
  })
}

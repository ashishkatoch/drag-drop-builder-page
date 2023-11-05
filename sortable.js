var formBuilder = {
  init: function () {
    $(document).on('change', "#all_email_marketsfb", this.getActiveCampaigns);
    $(document).on('blur', ".thnku_url", this.changePopupFields);
    //js for cc,bcc dynamic fields 
    $("body").on("click", ".removeEmail", function () {
      $(this).closest("div").remove();
    });
    $("body").on("click", ".addmore-wrapper", function () {
      $(this).prev('input').removeClass('erroremail');
      var nameattr = $(this).prev('input').attr('name');
      var currentval, newInput;
      var div = $("<div class='duplicatefield'/>");
      currentval = $(this).prev('input').val();

      if (currentval == '' || !validateEmail(currentval)) {
        $(this).prev('input').addClass('erroremail');
        $(this).parents('.add-more-wrapper').prev('.error-emails').text('Invalid/Required Email');
        return false;
      }
      var emptyval = "";
      div.html(GetDynamicTextBox(emptyval, nameattr));
      $(this).parents('.duplicatefield').after(div);
      $(this).replaceWith('<span href="#" class="removeEmail" title="Delete Email">-</span>');
      $('.error-emails').text('');

    });
    $(".completing-form span").dblclick(function () {
      var $txt = $('[name="email_subject"]');
      var caretPos = $txt[0].selectionStart;
      var textAreaTxt = $txt.val();
      //var txtToAdd = "[# of submitted forms]";
      var txtToAdd = $(this).text();
      $txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos));
    });
    function GetDynamicTextBox(value, nameattr) {
      return '<input name ="' + nameattr + '" type="text" value = "' + value + '" /><a href="javascript:void(0)" id="" class="addmore-wrapper button button-primary button-large"><span id="credit_card_loading"><img src="' + siteUrl + '/images/rapify_img/loading-img.gif">Processing...</span><span class="addmore" title="Add Email">+</span></a>&nbsp';
    }
    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    //Chk which formtype is selected

    $('.saveCalltoWhichForm').on('click', function () {
      var formtypeval = $('#aformtype').val();

      if (formtypeval == "1") {
        //call enquiry form
        $('.saveEnquiryForm').trigger('click');
      }
      else if (formtypeval == "2") {
        //call mcq form
        $('.saveMcqForm').trigger('click');
      }
      else {
        $('.formtype-toggle').show();
        $('.error-fromtype').text('Please select form type');
        setTimeout(function () {
          $('.error-fromtype').text('');
        }, 2000);

      }
    });
  },
  guid: function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  },
  checkFormType: function () {
    document.body.style.display = "block";
    $('#enquiry-form, #mcq-form').hide();

    $('#aformtype').on('change', function () {
      var selectedformval = $('#aformtype').val();

      $('#enquiry-form').find('.errorMsg').html('');
      $('#enquiry-form').find('input,select').each(function () {
        $(this).removeClass('border-red-textbox');
      })
      switch (selectedformval) {
        case "0": {
          $('#enquiry-form, #mcq-form').hide();
          break;
        }
        case "1": {
          $('#enquiry-form').show();
          //be sure fist field open at onchange event by type of form seclection
          if ($('#enquiry-form').find('.enq-single-group-container-plus-add:first .white-color-grp-icon').hasClass('fa-sort-asc')) {

            $('#enquiry-form').find('.enq-single-group-container-plus-add:first .white-color-grp-icon').trigger('click');
          }
          if ($('#enquiry-form').find('.enq-single-group-container-plus-add:first .white-color-icon').hasClass('fa-sort-asc')) {
            $('#enquiry-form').find('.enq-single-group-container-plus-add:first .white-color-icon').trigger('click');
          }
          $('#mcq-form').hide();
          break;
        }
        case "2": {
          $('#mcq-form').show();
          if ($('#mcq-form').find('.mcq-single-group-container-plus-add:first .white-color-grp-icon').hasClass('fa-sort-asc')) {
            $('#mcq-form').find('.mcq-single-group-container-plus-add:first .white-color-grp-icon').trigger('click');
          }
          if ($('#mcq-form').find('.mcq-single-group-container-plus-add:first .white-color-icon').hasClass('fa-sort-asc')) {
            $('#mcq-form').find('.mcq-single-group-container-plus-add:first .white-color-icon').trigger('click');
          }
          $('#enquiry-form').hide();
          break;
        }
        default: {
          console.log('Form type is not available');
        }
      }

    })
  },
  statusForm: function () {

    $('.user-information').hide();
    $('.form-location').hide();


    $('#userformShow').on('change', function () {
      var selectedformval = $('#userformShow').val();

      $('#user-form').find('.errorMsg').html('');
      $('#user-form').find('input,select').each(function () {
        $(this).removeClass('border-red-textbox');
      })
      switch (selectedformval) {
        case "0": {
          $('.user-information').hide();
          $('.form-location').hide();
          break;
        }
        case "1": {
          $('.user-information').show();
          $('.form-location').show();
          //It will open the first field inside User Details section.
          if ($('.user-information').find('.parent-user-accordion:first .white-color-icon').hasClass('fa-sort-desc')) {
            $('.user-information').find('.parent-user-accordion:first').trigger('click');

          }
          break;
        }
        default: {
          console.log('Default');
        }
      }

    })
  },
  enqCheckTagOptionType: function () {

    /*For Adding Text*/
    $('body').on('click', '.text-add', function () {
      var newCheckbox = '<div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><div class="text-add" title="Add label">+</div><div class="text-sub" title="Delete Label">-</div></div>';
      $(this).parents('.single-question-container').find('.text-group').append(newCheckbox);
    });
    /*For Removing Text*/
    $('body').on('click', '.text-sub', function () {
      $(this).parents('.text').remove();
    });

    /*Different types of html element*/
    $('body').on('change', '.ctagoptions', function () {

      var selectedformval = $(this).val();
      var currentContainer = $(this).parents('.single-question-container').find('.optionscontainer');
      var currentselectedthis = $(this);

      /*Firstly remove any field existing in the optionscontainer and required*/
      currentContainer.html('');
      $(this).parents('.single-question-container').find('.enqisrequiredwrapper').remove();



      /*Restriction for email field one on the whole form*/
      var chklen = 0, flag = true;
      $('.ctagoptions').each(function () {
        if ($(this).val() == 4) {
          chklen++;
        }
        if (chklen > 1 && flag) {
          currentselectedthis.prop('selectedIndex', 0);
          selectedformval = '9';
          flag = false;
          return selectedformval;
        }
      });

      /** Restriction for First name field one on the whole form*/
      var chklen1 = 0; flag1 = true;
      $('.ctagoptions').each(function () {
        if ($(this).val() == 5) {
          chklen1++;
        }
        if (chklen1 > 1 && flag1) {
          currentselectedthis.prop('selectedIndex', 0);
          selectedformval = '9';
          flag1 = false;
          return selectedformval;
        }
      });
      /*Restriction for last name field one on the whole form*/
      var chklen2 = 0; flag2 = true;
      $('.ctagoptions').each(function () {
        if ($(this).val() == 6) {
          chklen2++;
        }
        if (chklen2 > 1 && flag2) {
          currentselectedthis.prop('selectedIndex', 0);
          selectedformval = '9';
          flag2 = false;
          return selectedformval;
        }
      });
      /*Restriction for phone field one on the whole form*/
      var chklen3 = 0; flag3 = true;
      $('.ctagoptions').each(function () {
        if ($(this).val() == 7) {
          chklen3++;
        }
        if (chklen3 > 1 && flag3) {
          currentselectedthis.prop('selectedIndex', 0);
          selectedformval = '9';
          flag3 = false;
          return selectedformval;
        }
      });


      switch (selectedformval) {
        case "0": {
          break;
        }
        case "1": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><div class="text-add" title="Add label">+</div></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "2": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><div class="text-add" title="Add label">+</div></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "3": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><div class="text-add" title="Add label">+</div></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "4": {

          /*copy html of campaign*/
          saveCampaignHTML = $('.temp-wrapp').html();
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"></div></div>';
          currentContainer.append(textHtml);
          currentContainer.append(saveCampaignHTML);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "5": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "6": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "7": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "8": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "10": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><div class="text-add" title="Add label">+</div></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "11": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer" style="display:none;"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="specialfieldyear" type="text"></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "12": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"  style="display:none;"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="specialfieldvehiclemake" type="text"></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "13": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer" style="display:none;"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="specialfieldvehiclemodel" type="text"></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "14": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer" style="display:none;"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="specialfieldvehiclebodytype" type="text"></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "15": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer" style="display:none;"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="specialfieldcompnayinsurance" type="text"></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "16": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer" style="display:none;"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="specialfielddatepicker" type="text"></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "17": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><div class="text-add" title="Add label">+</div></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "18": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="enqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><div class="text-add" title="Add label">+</div></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="enqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "9": {
          $('.tempNotify').remove();
          $(this).after('<span style="color:red;float: left;margin-top: 0px;font-size: 13px;text-align: left;" class="tempNotify">Field is already defined</span>');
          setTimeout(function () { $('.tempNotify').remove(); }, 2000);
        }
        default: {
          console.log('Tag form type is not available');
        }
      }

    })
  },
  enqShowHide: function () {

    $('.parent-accordion').parents('.single-question-container').find('.single-question-inner-container').hide();
    $('body').on('click', '.parent-accordion', function () {
      var parentThis = $(this);
      $(this).parents('.single-question-container').find('.single-question-inner-container').slideToggle('slow', function () {
        parentThis.find('i').toggleClass("fa-sort-asc fa-sort-desc");
      });
    });
  },
  enqGrpShowHide: function () {

    $('.parent-enqgrp-accordion').parents('#enquiry-form').find('.enq-single-group-container-plus-add-inner-toggle').hide();
    $('body').on('click', '.parent-enqgrp-accordion', function () {
      var parentgrpThis = $(this);
      $(this).parents('.enq-single-group-container-plus-add').find('.enq-single-group-container-plus-add-inner-toggle').slideToggle('slow', function () {
        parentgrpThis.find('i').toggleClass("fa-sort-asc fa-sort-desc");
      });
    });
  },
  enqCloneForms: function () {
    var validateStatus = true;
    var startHtmlsenq = [];
    startHtmlsenq = formBuilder.readEnquiryFieldGroupSettingHtml();
    startHtmlenq = startHtmlsenq[0];
    grpHtmlenq = startHtmlsenq[1];


    /*Add New Group */

    $('body').on('click', '.addGrpEnqField', function () {

      // grpHtml  
      var parentGrpThis = $(this);
      $(this).parents('.enq-single-group-container-plus-add').after(grpHtmlenq);
      // Hide before creating new group
      $(this).parents('.enq-single-group-container-plus-add').find('.enq-single-group-container-plus-add-inner-toggle').hide();
      $(this).parents('.enq-single-group-container-plus-add').find('i.white-color-grp-icon').removeClass('fa-sort-desc').addClass('fa-sort-asc');
      // Show created new group
      $(this).parents('.enq-single-group-container-plus-add').next().find('.enq-single-group-container-plus-add-inner-toggle').show();
      $(this).parents('.enq-single-group-container-plus-add').next().find('.single-question-inner-container').show();

      /*Increment datacount of next group section*/
      if ($('.enq-single-group-container-plus-add').length == 1) {
        var arrayGrpIdRow = 0;
      }
      else {
        $(this).parents('.enq-single-group-container-plus-add').next('.enq-single-group-container-plus-add').attr('data-count', parseInt($(this).parents('.enq-single-group-container-plus-add').attr('data-count')) + 1);
        $(this).parents('.enq-single-group-container-plus-add').next('.enq-single-group-container-plus-add').attr('unique-step-id', formBuilder.guid());
      }


      if ($(this).parents('.enq-single-question-container-plus-add').prev('.enq-single-question-container-plus-add').length == 0) {
        var arrayGrpIdCol = 0;
      }
      else {
        var arrayGrpIdCol = $(this).parents('.enq-single-question-container-plus-add').prev('.enq-single-question-container-plus-add').attr('data-count') + 1;
      }
      parentGrpThis.parents('.enq-single-group-container-plus-add').find('.addGrpEnqField').removeClass('addGrpEnqField').addClass('delGrpEnqField');
      parentGrpThis.parents('.enq-single-group-container-plus-add').find('.addgrpEnqbtn').text('Delete Step');

      //remove multiple delete button
      if ($(this).parents('.enq-single-group-container-plus-add').find('.delGrpEnqField').length > 1) {
        $(this).parents('.enq-single-group-container-plus-add').find('.delGrpEnqField:last').remove();
      }

      //Dynamic keyup event binding with new step start
      $('body .enq-single-group-container-plus-add').each(function () {
        $(this).find('.single-question-inner-container .askque:first').on('keyup', function () {
          var quesVal = $(this).val();
          var flag = $(this).parents('.enq-single-group-container-plus-add').find('#enqgrporder').val();
          if (flag == '') {
            flag = $('body .enq-single-group-container-plus-add').length;
          }
          if (quesVal.length > 55) {
            quesVal = quesVal.substring(0, 55) + " ...";
          }
          $(this).parents('.single-question-container').find('.h5-accordion').text(quesVal);
          $(this).parents('.enq-single-group-container-plus-add').find('.h5-accordion:first').text('(' + flag + ')' + ' ' + quesVal);
        });
        $(this).find('.single-question-inner-container .askque:not(:first)').on('keyup', function () {
          var quesVal = $(this).val().trim();
          if (quesVal.length > 55) {
            quesVal = quesVal.substring(0, 55) + " ...";
          }
          $(this).parents('.single-question-container').find('.h5-accordion').text(quesVal);
        });
      });
      //Dynamic keyup event binding with new step End


      //Check form theme and based on show/hide name field
      if ($('#formtheme').val() == '1') {
        $('.custom_name_wrapper').removeClass('hideinsurance');
      }

      if ($('#formtheme').val() == '1') {
        $('.imageUploader').removeClass('hideinsurance');
        $('body .ctagoptions option').each(function () {
          if ($(this).val() == 11 || $(this).val() == 12 || $(this).val() == 13 || $(this).val() == 14 || $(this).val() == 15 || $(this).val() == 17) {
            $(this).removeClass('insurance_special_fields');
          }
        });
      } else {

        $('.imageUploader').addClass('hideinsurance');
        $('body .ctagoptions option').each(function () {
          if ($(this).val() == 11 || $(this).val() == 12 || $(this).val() == 13 || $(this).val() == 14 || $(this).val() == 15 || $(this).val() == 17) {
            $(this).addClass('insurance_special_fields');
          }
        });
      }



    })

    /*Add new field*/
    $('body').on('click', '.addEnqField', function () {
      var parentThis = $(this);

      /*Before Adding New Field, Need to check existing field is not empty*/
      var errorMessageAr = [];

      if (parentThis.parents('.enq-single-question-container-plus-add').find($('.askque')).val() == "") {
        var currentThis = parentThis.parents('.enq-single-question-container-plus-add').find($('.askque'));
        error = "Question field is empty";
        errorMessageAr.push(error);
        parentThis.parents('.enq-single-question-container-plus-add').find('.single-question-inner-container').show();
        formBuilder.validationEnquiry(parentThis, currentThis, errorMessageAr);
        return false;
      }
      else if (parentThis.parents('.enq-single-question-container-plus-add').find($('.ctagoptions option:selected')).val() == 0) {
        var currentThis = parentThis.parents('.enq-single-question-container-plus-add').find($('.ctagoptions'));
        error = "Please select Option";
        errorMessageAr.push(error);
        parentThis.parents('.enq-single-question-container-plus-add').find('.single-question-inner-container').show();
        formBuilder.validationEnquiry(parentThis, currentThis, errorMessageAr);
        return false;
      }
      else {
        var currentThis = '';
        formBuilder.validationEnquiry(parentThis, currentThis, errorMessageAr);
      }

      // Hide before creating new field
      $(this).parents('.enq-single-question-container-plus-add').find('.single-question-inner-container').hide();
      $(this).parents('.enq-single-question-container-plus-add').after(startHtmlenq);

      //Bind with keyup event start

      $(this).parents('.enq-single-question-container-plus-add').next().find('.single-question-inner-container .askque').on('keyup', function () {
        var quesVal = $(this).val().trim();
        if (quesVal.length > 55) {
          quesVal = quesVal.substring(0, 55) + " ...";
        }
        $(this).parents('.single-question-container').find('.h5-accordion').text(quesVal);
      });
      //Bind with keyup event end

      // Show new field after creating new field using add new btn
      $(this).parents('.enq-single-question-container-plus-add').next().find('.single-question-inner-container').show();
      parentThis.parents('.enq-single-question-container-plus-add').find('.addEnqField').removeClass('addEnqField').addClass('delEnqField');
      parentThis.parents('.enq-single-question-container-plus-add').find('.enqBtnName').text('x');
      parentThis.parents('.enq-single-question-container-plus-add').find('.enqBtnName').attr('title', 'Delete Question');

      //Code for delete btn for all other fields
      varTargetAllFields = parentThis.parents('.enq-single-question-container-plus-add').prevAll('.enq-single-question-container-plus-add');
      varTargetAllFields.find('.addEnqField').removeClass('addEnqField').addClass('delEnqField');
      varTargetAllFields.find('.enqBtnName').text('x');
      varTargetAllFields.find('.enqBtnName').attr('title', 'Delete Question');

      //remove multiple delete button 
      if ($(this).parents('.enq-single-question-container-plus-add').find('.delEnqField').length > 1) { $(this).parents('.enq-single-question-container-plus-add').find('.delEnqField:last').remove(); }


      //Check form theme and based on show/hide name field
      if ($('#formtheme').val() == '1') {
        $('.custom_name_wrapper').removeClass('hideinsurance');
        $('body .ctagoptions option').each(function () {
          if ($(this).val() == 11 || $(this).val() == 12 || $(this).val() == 13 || $(this).val() == 14 || $(this).val() == 15 || $(this).val() == 17) {
            $(this).removeClass('insurance_special_fields');
          }
        });
      } else {
        $('.imageUploader').addClass('hideinsurance');
        $('body .ctagoptions option').each(function () {
          if ($(this).val() == 11 || $(this).val() == 12 || $(this).val() == 13 || $(this).val() == 14 || $(this).val() == 15 || $(this).val() == 17) {
            $(this).addClass('insurance_special_fields');
          }
        });
      }


    });

  },
  enqDelForms: function () {

    $('body').on('click', '.delEnqField', function () {
      if (confirm('Are you sure you want to delete this section?')) { } else { return false; }
      //Enq delete btn
      var parentThisenq = $(this).parents('.enq-single-group-container-plus-add-inner-toggle');
      $(this).parents('.enq-single-question-container-plus-add').remove();
      //check steps have add step btn to last element 
      var lastElementWithoutFieldsBTN = parentThisenq.find('.enq-single-question-container-plus-add').last().find('.addEnqField').length;
      //check only one step left on the page. Prevent it from deletion
      if (parentThisenq.find('.enq-single-question-container-plus-add').length == 1) {
        parentThisenq.find('.addEnqField').remove();
        parentThisenq.find('.enqBtnName').text('+');
        parentThisenq.find('.enqBtnName').attr("title", "Add Question");

        parentThisenq.find('.delEnqField').addClass('addEnqField').removeClass('delEnqField');
      } else if (lastElementWithoutFieldsBTN == 0) {
        parentThisenq.find('.enq-single-question-container-plus-add').last().find('.delEnqField').after('<a title="Add Question" href="javascript:void(0)" id="enquiry-next-button" class="button button-primary button-large addEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="enqBtnName" title="Add Question">+</span></a>');
      }

      //Mcq delete btn
      var parentThisenq = $(this).parents('.mcq-single-group-container-plus-add-inner-toggle');
      $(this).parents('.mcq-single-question-container-plus-add').remove();
      //check steps have add step btn to last element 
      var lastElementWithoutFieldsBTN = parentThisenq.find('.mcq-single-question-container-plus-add').last().find('.addMcqField').length;
      //check only one step left on the page. Prevent it from deletion
      if (parentThisenq.find('.mcq-single-question-container-plus-add').length == 1) {
        parentThisenq.find('.addMcqField').remove();
        parentThisenq.find('.enqBtnName').text('+');
        parentThisenq.find('.delEnqField').addClass('addMcqField').removeClass('delEnqField');
      } else if (lastElementWithoutFieldsBTN == 0) {
        parentThisenq.find('.m                cq-single-question-container-plus-add').last().find('.delEnqField').after('<a title="Add Question" href="javascript:void(0)" id="enquiry-next-button" class="button button-primary button-large addMcqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="enqBtnName"  title="Add Question">+</span></a>');
      }


    });

  },
  enqGrpDelForms: function () {




    $('body').on('click', '.delGrpEnqField', function () {

      if (confirm('Are you sure you want to delete this step?')) { } else { return false; }

      var parentgrpThis = $(this);
      $(this).parents('.enq-single-group-container-plus-add').remove();
      //check steps have add step btn to last element 
      var lastElementWihtoutStepBTN = $('.enquiry-form-wrapper').find('.enq-single-group-container-plus-add').last().find('.addGrpEnqField').length;

      //check only one step left on the page. Prevent it from deletion
      if ($('.enquiry-form-wrapper').find('.enq-single-group-container-plus-add').length == 1) {
        $('.enquiry-form-wrapper').find('.addgrpEnqbtn').text('Add Step');
        $('.enquiry-form-wrapper').find('.addGrpEnqField').remove();
        $('.enquiry-form-wrapper').find('.delGrpEnqField').addClass('addGrpEnqField').removeClass('delGrpEnqField');
      } else if (lastElementWihtoutStepBTN == 0) {
        $('.enquiry-form-wrapper').find('.enq-single-group-container-plus-add').last().find('.delGrpEnqField').after('<a href="javascript:void(0)" id="" class="button button-primary button-large addGrpEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="addgrpEnqbtn">Add Step</span></a>');
      }
      formBuilder.rearrangeClub();
    });

  },
  saveEnqForms: function () {


    $('body').on('click', '.saveEnquiryForm', function () {
      var errorMessageAr = [];
      validateStatus = true;
      /*Check form name field should not empty*/
      if ($('#formname').val() == "") {
        $('#formname').addClass('border-red-textbox');
        validateStatus = false;
      }
      else {
        $('#formname').removeClass('border-red-textbox');
      }
      $(this).parents('#enquiry-form').find('.border-red-textbox').removeClass('border-red-textbox');
      $(this).parents('#enquiry-form').find('.errorEnqMsg').html('');
      $(this).parents('#enquiry-form').find('.errorMsg').html('');
      $('#enquiry-form').find('input,select').each(function () {
        if ($(this).is('select') && !($(this).hasClass('ignorevalidation'))) {
          if ($('option:selected', this).val() == 0) {
            $(this).addClass('border-red-textbox');
            $(this).parents('.single-question-inner-container').show();
            $(this).parents('.enq-single-group-container-plus-add-inner-toggle').show();
            $(this).parents('.formtype-toggle').show();

            validateStatus = false;
            error = "Check Red Required Fields";
            errorMessageAr.push(error);
          }
        }
        else if ($(this).is('input') && !($(this).is('input[type="file"]'))) {
          console.log($(this).val());
          if ($(this).val() == "" && !($(this).hasClass('enqgrporder')) && !($(this).hasClass('custom_name_wrapper_input')) && !($(this).hasClass('enquirytextval'))) {
            $(this).addClass('border-red-textbox');
            $(this).parents('.single-question-inner-container').show();
            $(this).parents('.enq-single-group-container-plus-add-inner-toggle').show();
            $(this).parents('.formtype-toggle').show();
            validateStatus = false;
          }
        }
      });


      /*Check style fields are not empty except return url*/
      $('#styleForm').find('input,select,textarea').not("#thnku_url").each(function () {

        if ($(this).is('input') && !($(this).hasClass('enqgrporder'))) {

          if ($(this).val() == "") {
            $(this).addClass('border-red-textbox');
            $(this).parents('.edit-form-slide').show();
            $(this).parents('.edit-form-slide').prev().find('i.white-color-grp-icon').toggleClass('fa-sort-desc').toggleClass('fa-sort-asc');
            validateStatus = false;
          } else {
            $(this).removeClass('border-red-textbox');
          }
        }
      });

      $('.thnku_url').each(function () {
        if (!($(this).attr('style') == 'display: none;')) {
          if ($(this).val() == "") {
            $(this).addClass('border-red-textbox');
            $(this).parents('.edit-form-slide').show();
            $(this).parents('.edit-form-slide').prev().find('i.white-color-grp-icon').toggleClass('fa-sort-desc').toggleClass('fa-sort-asc');
            validateStatus = false;
          } else {
            $(this).removeClass('border-red-textbox');
          }
        }
      });


      /*Check user option fields are not empty if show form*/
      var show_form = $('#userformShow').val();

      if (show_form == 1) {
        $('#user-form').find('input,select').each(function () {

          if ($(this).is('select')) {

            if ($('option:selected', this).val() == 0) {
              $(this).addClass('border-red-textbox');
              $(this).parents('.user-inner-container').show();
              validateStatus = false;
              error = "Check Red Required Fields";
              errorMessageAr.push(error);
            }
          }
          else if ($(this).is('input')) {
            if ($(this).val() == "") {
              $(this).addClass('border-red-textbox');
              $(this).parents('.user-inner-container').show();
              validateStatus = false;
              error = "Check Red Required Fields";
              errorMessageAr.push(error);
            }
          }
        });
      }

      if (!validateStatus) {
        var errorMessageAr = [];
        error = "Check Red Required Fields";
        errorMessageAr.push(error);
        currentThis = "";
        var parentThis = $(this);
        formBuilder.validationEnquiry(parentThis, currentThis, errorMessageAr);
        return;
      }
      formBuilder.ajaxEnqForm();
    });


  },
  validationEnquiry: function (addfieldbtn, currentThis, messageAr) {
    if (addfieldbtn) {

      //If save field is clicked 
      if (addfieldbtn.hasClass('saveEnquiryForm')) {
        addfieldbtn.parents('#enquiry-form').find('.errorEnqMsg').html('');
        addfieldbtn.parents('.enquiry-form').find('.errorMsg').html('');

        var message = messageAr.join('<br>');
        addfieldbtn.parents('#enquiry-form').find('.errorEnqMsg').removeClass('success_response');
        addfieldbtn.parents('#enquiry-form').find('.errorEnqMsg').addClass('error_response');
        addfieldbtn.parents('#enquiry-form').find('.errorEnqMsg').html(message);
        return;
      }

      //If add field is clicked 
      addfieldbtn.parents('.enq-single-question-container-plus-add').find('.border-red-textbox').removeClass('border-red-textbox');
      addfieldbtn.parents('.enquiry-form').find('.errorMsg').html('');
      addfieldbtn.parents('.enquiry-form').find('.errorEnqMsg').html('');
      var message = messageAr.join('<br>');
      addfieldbtn.parents('.enquiry-form').find('.errorMsg').removeClass('success_response');
      addfieldbtn.parents('.enquiry-form').find('.errorMsg').addClass('error_response');
      addfieldbtn.parents('.enquiry-form').find('.errorMsg').html(message);

    }
    if (currentThis) {
      currentThis.addClass('border-red-textbox');
    }
  },
  userShowHide: function () {

    $('.parent-user-accordion').parents('.user-container').find('.user-inner-container').hide();
    $('body').on('click', '.parent-user-accordion', function () {
      var parentThis = $(this);
      $(this).parents('.user-container').find('.user-inner-container').slideToggle('slow', function () {
        parentThis.find('i').toggleClass("fa-sort-asc fa-sort-desc");
      });
    });
  },
  userCheckTagOptionType: function () {

    /*For Adding Text*/
    $('body').on('click', '.text-add', function () {

      var labeltype = $(this).parents('.optionsusercontainer').prev('.user_option_type').find('select.usertagoptions option:selected').text();
      var countTextbox = $(this).parents('.text-group').find('.text').length + 1;
      var newCheckbox = '<div class="text add-sub-outer"><span class="usertextlabel width-10">label</span><input name="user-text-val[][]" class="usertextval" value="" type="text"><div class="text-add" title="Add label">+</div><div class="text-sub" title="Delete Label">-</div></div>';
      $(this).parents('.user-inner-container').find('.text-group').append(newCheckbox);


    });
    /*For Removing Text*/
    $('body').on('click', '.text-sub', function () {
      $(this).parents('.text').remove();
    });

    /*Different types of html element*/
    $('body').on('change', '.usertagoptions', function () {

      var selectedformval = $(this).val();
      var currentContainer = $(this).parents('.user-container').find('.optionsusercontainer');

      /*Firstly remove any field existing in the optionscontainer and required*/
      currentContainer.html('');
      $(this).parents('.user-container').find('.userisrequiredwrapper').remove();

      switch (selectedformval) {
        case "0": {
          break;
        }
        case "1": {
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="usertextlabel label-show-form width-10">label</span><input name="user-text-val[][]" class="usertextval" value="" type="text"></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="userisrequiredwrapper padding-both"><input type="checkbox" class="userisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "2": {
          var questionName = '<div class="question_name"> <span class="label-show-form width-10" for="labe-question">Heading</span><div class="jk_st_opt_cont jk_input-padding"><input type="text" class="jk_st_inner_cont askuserque border-red-textbox mb-20" placeholder="Ask Heading" id="labe-question" name="askuserque[]" value=""></div></div>';
          var textHtml = '<div class="text-group"><div class="text  add-sub-outer"><span class="usertextlabel label-show-form width-10">label</span><input name="user-text-val[][]" class="usertextval" value="" type="text"><div class="text-add" title="Add label">+</div></div></div>';
          /*currentContainer.append(); */
          currentContainer.append(questionName + textHtml);
          var isRequired = '<div class="userisrequiredwrapper padding-both"><input type="checkbox" class="userisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "3": {
          var questionName = '<div class="question_name"> <span class="label-show-form width-10" for="labe-question">Heading</span><div class="jk_st_opt_cont jk_input-padding"><input type="text" class="jk_st_inner_cont askuserque border-red-textbox mb-20" placeholder="Ask Heading" id="labe-question" name="askuserque[]" value=""></div></div>';
          var textHtml = '<div class="text-group"><div class="text add-sub-outer"><span class="usertextlabel label-show-form width-10">label</span><input name="user-text-val[][]" class="usertextval" value="" type="text"><div class="text-add" title="Add label">+</div></div></div>';
          currentContainer.append(questionName + textHtml);
          var isRequired = '<div class="userisrequiredwrapper padding-both"><input type="checkbox" class="userisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "4": {

          break;
        }
        default: {
          console.log('Tag form type is not available');
        }
      }

    })
  },
  userAddField: function () {

    var validateStatus = true;
    $('.user-single-question-container-plus-add').wrap('<div class="tempUsage5"></div>');
    /*Start html update.because it causes an issue on edit time*/
    var startHtml;
    startHtml = formBuilder.readUserFieldSettingHtml();
    /*Add new field*/
    $('body').on('click', '.addUserField', function () {
      var parentUserThis = $(this);

      /*Before Adding New Field, Need to check existing field is not empty*/
      var errorMessageAr = [];

      if (parentUserThis.parents('.user-single-question-container-plus-add').find($('.askuserque')).val() == "") {
        var currentThis = parentUserThis.parents('.user-single-question-container-plus-add').find($('.askuserque'));
        error = "Question field is empty";
        errorMessageAr.push(error);
        parentUserThis.parents('.user-single-question-container-plus-add').find('.user-inner-container').show();
        formBuilder.uservalidationEnquiry(parentUserThis, currentThis, errorMessageAr);
        return false;
      }
      else if (parentUserThis.parents('.user-single-question-container-plus-add').find($('.usertagoptions option:selected')).val() == 0) {
        var currentThis = parentUserThis.parents('.user-single-question-container-plus-add').find($('.usertagoptions'));
        error = "Please select Option";
        errorMessageAr.push(error);
        parentUserThis.parents('.user-single-question-container-plus-add').find('.user-inner-container').show();
        formBuilder.uservalidationEnquiry(parentUserThis, currentThis, errorMessageAr);
        return false;
      }
      else {
        var currentThis = '';
        formBuilder.uservalidationEnquiry(parentUserThis, currentThis, errorMessageAr);
      }


      // Hide before creating new field
      $(this).parents('.user-single-question-container-plus-add').find('.user-inner-container').hide();
      $(this).parents('.user-single-question-container-plus-add').after(startHtml);
      // Show new field after creating new field using add new btn
      $(this).parents('.user-single-question-container-plus-add').next().find('.user-inner-container').show();
      parentUserThis.parents('.user-single-question-container-plus-add').find('.addUserField').removeClass('addUserField').addClass('delUserField');
      parentUserThis.parents('.user-single-question-container-plus-add').find('.userBtnName').text('-');


      //Code for delete btn for all other fields
      varTargetAllFields = parentUserThis.parents('.user-single-question-container-plus-add').prevAll('.user-single-question-container-plus-add');
      varTargetAllFields.find('.addUserField').removeClass('addUserField').addClass('delUserField');
      varTargetAllFields.find('.userBtnName').text('-');

    });
  },
  userDelForms: function () {

    $('body').on('click', '.delUserField', function () {
      var parentThis = $(this);
      $(this).parents('.user-single-question-container-plus-add').remove();
    });

  },

  readUserDetails: function () {

    /*Wrapper user details script */

    /*Script for storing User Heading */
    var userHeading = $('[name="heading_user"]').val();

    /*Script for storing Array of User Questions */
    var arrayUserQuestions = [];
    $('.user-single-question-container-plus-add').each(function (i) {
      arrayUserQuestions[i] = [];
      arrayUserQuestions[i] = $(this).find('input[name="askuserque[]"]').val();
    });

    /*Script for storing Array of User Questions Types */
    var arrayUserQuestionstype = [];
    $('.user-single-question-container-plus-add').find('.usertagoptions').each(function (i) {
      arrayUserQuestionstype[i] = ($("option:selected", this)).val();
    });

    /*Script for storing Array of User labels */
    var arrayLabels = [];
    $('.user-single-question-container-plus-add').each(function (i, val1) {
      arrayLabels[i] = [];

      $(this).find('.usertextval').each(function (j, val2) {
        arrayLabels[i][j] = val2['value'];
      });
    });


    /*Script for storing Array of User required*/
    var arrayUserRequired = [];
    $('.user-single-question-container-plus-add').find('.userisrequired').each(function (i, val) {
      arrayUserRequired[i] = [];
      if ($(this).is(':checked')) {
        arrayUserRequired[i] = "1";
      }
      else {
        arrayUserRequired[i] = "0";
      }
    });
    /*Wrapper user details script end*/
    return [
      arrayUserQuestions,
      arrayUserQuestionstype,
      arrayLabels,
      arrayUserRequired,
      userHeading
    ];
  },
  uservalidationEnquiry: function (addfieldbtn, currentThis, messageAr) {


    if (addfieldbtn) {
      //If save field is clicked 
      if (addfieldbtn.hasClass('saveEnquiryForm')) {
        addfieldbtn.parents('#user-form').find('.errorEnqMsg').html('');
        addfieldbtn.parents('.user-form').find('.errorMsg').html('');

        var message = messageAr.join('<br>');
        addfieldbtn.parents('#user-form').find('.errorEnqMsg').removeClass('success_response');
        addfieldbtn.parents('#user-form').find('.errorEnqMsg').addClass('error_response');
        addfieldbtn.parents('#user-form').find('.errorEnqMsg').html(message);
        return;
      }

      //If add field is clicked 
      addfieldbtn.parents('.user-single-question-container-plus-add').find('.border-red-textbox').removeClass('border-red-textbox');
      addfieldbtn.parents('.user-form').find('.errorMsg').html('');
      addfieldbtn.parents('.user-form').find('.errorEnqMsg').html('');
      var message = messageAr.join('<br>');
      addfieldbtn.parents('.user-form').find('.errorMsg').removeClass('success_response');
      addfieldbtn.parents('.user-form').find('.errorMsg').addClass('error_response');
      addfieldbtn.parents('.user-form').find('.errorMsg').html(message);

    }
    if (currentThis) {
      currentThis.addClass('border-red-textbox');
    }




  },
  ajaxEnqForm: function () {

    var formDataArray = $('form#enquiry-form').serializeArray();

    /*Make array to store all the data in chunks*/
    /*Script for storing Form type*/
    var formType = $.trim($('#aformtype option:selected').val());
    /*Script for storing Form name*/
    //var formName = $.trim(jQuery('#aformname').val());
    var formName = $.trim(jQuery('#formname').val());
    var formCaptchaVal = $.trim(jQuery('#quiz_captcha').val());

    /*Script for storing Array of Group Name*/
    var arrayGroupName = [];
    $('.enq-single-group-container-plus-add').find('.enqgrpname').each(function (i, val) {
      arrayGroupName[i] = $.trim($(this).val());
    });

    /*Script for storing Image*/
    var arrayGroupImg = [];
    $('.enq-single-group-container-plus-add').find('.imageUploader').each(function (i, val) {
      if ($(this).find('.quiz_preview_img img').length > 0) {
        arrayGroupImg[i] = $.trim($(this).find('.quiz_preview_img img').attr('src'));
      } else {
        arrayGroupImg[i] = '';
      }

    });

    /*Script for storing Array of question name attr*/
    var arrayQuesNameAttr = [];
    $('.enq-single-group-container-plus-add').each(function (i) {
      arrayQuesNameAttr[i] = [];
      $(this).find('input[name="custom_name[]"]').each(function (j, val) {
        arrayQuesNameAttr[i][j] = $.trim(val['value']);
      })
    });



    /*Script for storing Array of Group Unique Step Id*/
    var arrayStepUniqueId = [];
    $('.enq-single-group-container-plus-add').each(function (i, val) {
      arrayStepUniqueId[i] = $.trim($(this).attr('unique-step-id'));
    });


    /*Script for storing Array of Group Order*/
    var arrayGroupOrder = [];
    $('.enq-single-group-container-plus-add').find('#enqgrporder').each(function (i, val) {
      arrayGroupOrder[i] = $.trim($(this).val());
      if ($(this).val() == "") {
        var largest = 0;
        for (var j = 0; j < arrayGroupOrder.length; j++) {
          if (largest < arrayGroupOrder[j]) {
            largest = $.trim(arrayGroupOrder[j]);
          }
        }

        arrayGroupOrder[i] = (parseInt(largest) + 1).toString();
      }
    });

    /*Script for storing Array of Questions */
    var arrayQuestions = [];
    $('.enq-single-group-container-plus-add').each(function (i) {
      arrayQuestions[i] = [];
      $(this).find('input[name="askque[]"]').each(function (j, val) {
        arrayQuestions[i][j] = $.trim(val['value']);
      })
    });

    /*Script for storing Array of optiontypes */
    var arrayOptiontypes = [];
    $('.enq-single-group-container-plus-add').each(function (i, val) {
      arrayOptiontypes[i] = [];
      $(this).find('.ctagoptions').each(function (j, val) {
        arrayOptiontypes[i][j] = $.trim(($("option:selected", this)).val());
      })
    });

    /*Script for storing Array of options */
    var arrayOptions = [];
    $('.enq-single-group-container-plus-add').each(function (i, val1) {
      arrayOptions[i] = [];
      $(this).find('.single-question-container').each(function (j, val2) {
        arrayOptions[i][j] = [[]];
        $(this).find('.enquirytextval').each(function (k, val3) {
          arrayOptions[i][j][k] = $.trim(val3['value']);
        });
      })
    });


    /*Script for storing Array of required*/
    var arrayOptionsAnswers = [];
    var arrayRequired = [];
    $('.enq-single-group-container-plus-add').each(function (i, val) {
      arrayRequired[i] = [];
      $(this).find('.enqisrequired').each(function (j, val) {

        if ($(this).is(':checked')) {
          arrayRequired[i][j] = "1";
        }
        else {
          arrayRequired[i][j] = "0";
        }
      });
    });

    /*Script for storing Array of styles*/
    var seriesStyle = $('[name="styleForm"]').serializeArray();
    var seriesStyleinJson = {};
    $(seriesStyle).each(function (index, obj) {
      seriesStyleinJson[obj.name] = $.trim(obj.value);
    });

    /*Script for storing Array of mail sent to,bcc*/
    var seriesEmailForminJson = [];
    var seriesEmailForm = $('[name="emailForm"]').serializeArray();
    seriesEmailForm.forEach(function (value) {
      var existing = seriesEmailForminJson.filter(function (v, i) {
        return v.name == value.name;
      });
      if (existing.length) {
        var existingIndex = seriesEmailForminJson.indexOf(existing[0]);
        seriesEmailForminJson[existingIndex].value = seriesEmailForminJson[existingIndex].value.concat(value.value);
      } else {
        if (typeof value.value == 'string')
          value.value = [value.value];
        seriesEmailForminJson.push(value);
      }
    });



    /*Script for storing Json email setting */

    var emailMarket, emailMarketText, activeCampaign, activeCampaignText;
    var emailSettinginJson = {};
    try {

      emailMarket = $.trim($("[name=email_market] option:selected")[1].value);
      emailMarketText = $.trim($("[name=email_market] option:selected")[1].text);
      activeCampaign = $.trim($('[name=all_active_campaign] option:selected')[1].value);
      activeCampaignText = $.trim($('[name=all_active_campaign] option:selected')[1].text);

      api_code = $.trim($('.api_code').val());
      api_val = $.trim($('.api_val').val());
      api_username = $.trim($('.api_username').val());
      api_password = $.trim($('.api_password').val());

      emailSettinginJson = {
        emailKey: emailMarketText, emailValue: emailMarket
        , activeKey: activeCampaignText, activeValue: activeCampaign, api_code: api_code, api_val: api_val,
        api_password: api_password, api_username: api_username
      };
    }
    catch (err) {
      emailSettinginJson = '';
    }


    /*Script for storing text to display*/

    //var texttodisplay= $.trim($('#headertitle').val());
    var texttodisplay = CKEDITOR.instances['headertitle'].getData();
    var footertexttodisplay = CKEDITOR.instances['footertitle'].getData();


    /*Script for storing Array of type*/
    var form_location = $.trim($('#formLocation').val());
    var show_form = $.trim($('#userformShow').val());

    var userdetailsArr = [];
    var userdetailsArr = formBuilder.readUserDetails();

    //Send flag to notify, we are editing
    var checkFlag, editId, checkCloneUpdate, siteId, blockId, clubData;
    if ($('[name="checkFlag"]').length == 0) {
      checkFlag = 'add';
      checkCloneUpdate = $.trim($('[name="checkCloneUpdate"]').val());
      siteId = $.trim($('[name="siteId"]').val());
      blockId = $.trim($('[name="blockId"]').val());
    }
    else {
      checkFlag = $.trim($('[name="checkFlag"]').val());
      editId = $.trim($('[name="editId"]').val());
      /*Cloning purpose update form inside txt file*/
      checkCloneUpdate = $.trim($('[name="checkCloneUpdate"]').val());
      siteId = $.trim($('[name="siteId"]').val());
      blockId = $.trim($('[name="blockId"]').val());
    }
    // Club data insurance templates
    createClubArray = [];
    $('.available-club-element.td').each(function (i, v) {
      var clubName = $(this).find('.clubnameval').text();
      var clubVal = $(this).find('.clubValue').text();
      createClubArray.push({ clubName, clubVal });
    });
    seriesStyleinJson['clubData'] = JSON.stringify(createClubArray);
    $('.saveCalltoWhichForm #credit_card_loading').show();
    $('.saveCalltoWhichForm #credit_card_title').hide();
    $('.saveCalltoWhichForm').attr('disabled', 'disabled');
    /*Save Enquiry Form*/
    $.ajax({
      type: 'POST',
      dataType: 'html',
      url: siteUrl + "formbuilder/save",
      data: {
        formType: formType, formName: formName, formCaptchaVal: formCaptchaVal, arrayGroupName: arrayGroupName, arrayGroupImg: arrayGroupImg,
        arrayGroupOrder: arrayGroupOrder, arrayQuestions: arrayQuestions,
        arrayOptions: arrayOptions, arrayOptionsAnswers: arrayOptionsAnswers,
        arrayOptiontypes: arrayOptiontypes, arrayRequired: arrayRequired,
        userdetailsArr: userdetailsArr, form_location: form_location,
        show_form: show_form, checkFlag: checkFlag, editId: editId, seriesStyleinJson: seriesStyleinJson, texttodisplay: texttodisplay, footertexttodisplay: footertexttodisplay, emailSettinginJson: emailSettinginJson, arrayUniqueId: arrayStepUniqueId, seriesEmailForminJson: seriesEmailForminJson, checkCloneUpdate: checkCloneUpdate, siteId: siteId, blockId: blockId, arrayQuesNameAttr: arrayQuesNameAttr
      },
      success: function (data) {
        var ret = jQuery.parseJSON(data);
        $('.saveCalltoWhichForm #credit_card_loading').hide();
        $('.saveCalltoWhichForm #credit_card_title').show();
        $('.saveCalltoWhichForm').attr('disabled', 'false');
        window.scrollTo(0, 0);
        if (ret.responseCode == 0) {//error          
          $('.common-messages').html(ret.responseHTML);
        } else if (ret.responseCode == 1) {//all is well
          $('.common-messages').html(ret.responseHTML);
          $('.saveMcqForm').prop('disabled', true);
          $('.saveEnquiryForm').prop('disabled', true);
          if (ret.backToSite == 1) {
            $('#cancelbacktosite')[0].click();
          }
          /*temporary comment*/
          if (ret.responseClone) {
            $('.saveMcqForm').prop('disabled', false);
            $('.saveEnquiryForm').prop('disabled', false);
          }
          else {
            formsavedId = ret.lastInsertId
            location.href = siteUrl + "formbuilder/edit/" + formsavedId;
          }
        }

      },
      error: function (req, status, error) { }
    });

  },


  /*Start Js for MCQ */
  mcqCheckTagOptionType: function () {

    /*For Adding Text*/
    $('body').on('click', '.mcq-text-add', function () {

      var labeltype = $(this).parents('.optionscontainer').prev('.question_type').find('select.mcqtagoptions option:selected').text();
      /*  Check dynamic selected option type*/
      var type = $(this).parents('.mcq-single-question-inner-container').find('.mcqtagoptions option:selected').val();



      var arrayGrpIdRow = 0;
      var arrayGrpIdCol = 0;
      /*Check previous inner option attr*/
      if ($('.mcq-single-group-container-plus-add').length == 1) {
        var arrayGrpIdRow = 0;
      }
      else {
        // var arrayGrpIdRow = $(this).parents('.mcq-single-group-container-plus-add').prev().attr('data-count');    
        var arrayGrpIdRow = $(this).parents('.mcq-single-group-container-plus-add').attr('data-count');
      }

      var arrayGrpIdCol = parseInt($(this).parents('.optionscontainer').find('.mcq-answer:last').attr('data-count')) + 1;
      var arrayGrpIdK = parseInt($(this).parents('.mcq-single-question-container-plus-add').attr('data-count'));

      if (type == 2) {
        var newCheckbox = '<div class="mcq-text"><span class="mcqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><input type="radio" class="mcq-answer" data-count="' + arrayGrpIdCol + '" name="mcq-answer[' + arrayGrpIdRow + '][' + arrayGrpIdK + '][' + arrayGrpIdCol + ']"><div class="mcq-text-add">+</div><div class="mcq-text-sub">-</div></div>';
        $(this).parents('.mcq-single-question-container').find('.mcq-text-group').append(newCheckbox);
        var firstName = $(this).parents('.mcq-text').find('.mcq-answer:first').attr('name');
        $(this).parents('.optionscontainer').find('.mcq-answer').each(function () {
          $(this).attr('name', firstName);
        });
      }
      else if (type == 3) {
        var newCheckbox = '<div class="mcq-text"><span class="mcqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><input type="checkbox" class="mcq-answer" data-count="' + arrayGrpIdCol + '" name="mcq-answer[' + arrayGrpIdRow + '][' + arrayGrpIdK + '][' + arrayGrpIdCol + ']"><div class="mcq-text-add">+</div><div class="mcq-text-sub">-</div></div>';
        $(this).parents('.mcq-single-question-container').find('.mcq-text-group').append(newCheckbox);
        var firstName = $(this).parents('.mcq-text').find('.mcq-answer:first').attr('name');
        $(this).parents('.optionscontainer').find('.mcq-answer').each(function () {
          $(this).attr('name', firstName);
        });
      }




    });
    /*For Removing Text*/
    $('body').on('click', '.mcq-text-sub', function () {
      $(this).parents('.mcq-text').remove();
    });

    /*Different types of html element*/
    $('body').on('change', '.mcqtagoptions', function () {

      var selectedformval = $(this).val();
      var currentContainer = $(this).parents('.mcq-single-question-container').find('.optionscontainer');


      /*Check previous group id*/
      var arrayGrpIdRow = 0;
      var arrayGrpIdCol = 0;
      /*Check previous inner option attr*/
      /*if($(this).parents('.mcq-single-question-container-plus-add').length==1){
        var arrayGrpIdRow = 0;
      }*/

      var arrayGrpIdRow = $(this).parents('.mcq-single-group-container-plus-add').attr('data-count');
      var arrayGrpIdCol = 0;
      var arrayGrpIdK = $(this).parents('.mcq-single-question-container-plus-add').attr('data-count');



      /*Firstly remove any field existing in the optionscontainer and required*/
      currentContainer.html('');
      $(this).parents('.mcq-single-question-container').find('.enqisrequiredwrapper').remove();

      switch (selectedformval) {
        case "0": {
          break;
        }
        case "1": {
          var textHtml = '<div class="mcq-text-group"><div class="mcq-text"><span class="mcqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><div class="mcq-text-add">+</div></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="mcqisrequired" name="isrequired[]"><span class="paddingl-10">Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "2": {
          var textHtml = '<div class="mcq-text-group"><div class="mcq-text"><span class="mcqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><input type="radio" data-count="0" class="mcq-answer" name="mcq-answer[' + arrayGrpIdRow + '][' + arrayGrpIdK + '][' + arrayGrpIdCol + ']"><div class="mcq-text-add">+</div></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="mcqisrequired" name="isrequired[]"><span class="margin-left-10"> Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "3": {
          var textHtml = '<div class="mcq-text-group"><div class="mcq-text"><span class="mcqtextlabel">label</span><input name="enquiry-text-val[][]" class="enquirytextval" value="" type="text"><input type="checkbox" data-count="0" class="mcq-answer" name="mcq-answer[' + arrayGrpIdRow + '][' + arrayGrpIdK + '][' + arrayGrpIdCol + ']"><div class="mcq-text-add">+</div></div></div>';
          currentContainer.append(textHtml);
          var isRequired = '<div class="enqisrequiredwrapper"><input type="checkbox" class="mcqisrequired" name="isrequired[]"><span class="margin-left-10"> Is Required ?</span></div>';
          currentContainer.after(isRequired);
          break;
        }
        case "4": {

          break;
        }
        default: {
          console.log('Tag form type is not available');
        }
      }

    })
  },
  mcqShowHide: function () {

    $('.parent-accordion').parents('.mcq-single-question-container').find('.mcq-single-question-inner-container').hide();
    $('body').on('click', '.parent-accordion', function () {
      var parentThis = $(this);
      $(this).parents('.mcq-single-question-container').find('.mcq-single-question-inner-container').slideToggle('slow', function () {
        parentThis.find('i.white-color-grp-icon').toggleClass("fa-sort-asc fa-sort-desc");
      });
    });
  },

  mcqGrpShowHide: function () {

    $('.parent-mcqgrp-accordion').parents('#mcq-form').find('.mcq-single-group-container-plus-add-inner-toggle').hide();
    $('body').on('click', '.parent-mcqgrp-accordion', function () {
      var parentgrpThis = $(this);
      $(this).parents('.mcq-single-group-container-plus-add').find('.mcq-single-group-container-plus-add-inner-toggle').slideToggle('slow', function () {
        parentgrpThis.find('i').toggleClass("fa-sort-asc fa-sort-desc");
      });
    });
  },
  mcqCloneForms: function () {
    var validateStatus = true;
    var startHtmlsmcq = [];
    startHtmlsmcq = formBuilder.readMcqFieldGroupSettingHtml();
    startHtmlmcq = startHtmlsmcq[0];
    grpHtmlmcq = startHtmlsmcq[1];

    /*Add New Group */

    $('body').on('click', '.addGrpMcqField', function () {

      // grpHtml
      var parentGrpThis = $(this);
      $(this).parents('.mcq-single-group-container-plus-add').after(grpHtmlmcq);
      // Hide before creating new group
      $(this).parents('.mcq-single-group-container-plus-add').find('.mcq-single-group-container-plus-add-inner-toggle').hide();
      $(this).parents('.mcq-single-group-container-plus-add').find('i').removeClass('fa-sort-desc').addClass('fa-sort-asc');
      // Show created new group
      $(this).parents('.mcq-single-group-container-plus-add').next().find('.mcq-single-group-container-plus-add-inner-toggle').show();
      $(this).parents('.mcq-single-group-container-plus-add').next().find('.mcq-single-question-inner-container').show();

      /*Increment datacount of next group section*/
      if ($('.mcq-single-group-container-plus-add').length == 1) {
        var arrayGrpIdRow = 0;
      }
      else {
        $(this).parents('.mcq-single-group-container-plus-add').next('.mcq-single-group-container-plus-add').attr('data-count', parseInt($(this).parents('.mcq-single-group-container-plus-add').attr('data-count')) + 1);
        $(this).parents('.mcq-single-group-container-plus-add').next('.mcq-single-group-container-plus-add').attr('unique-step-id', formBuilder.guid());
      }


      if ($(this).parents('.mcq-single-question-container-plus-add').prev('.mcq-single-question-container-plus-add').length == 0) {
        var arrayGrpIdCol = 0;
      }
      else {
        var arrayGrpIdCol = $(this).parents('.mcq-single-question-container-plus-add').prev('.mcq-single-question-container-plus-add').attr('data-count') + 1;
      }

      parentGrpThis.parents('.mcq-single-group-container-plus-add').find('.addGrpMcqField').removeClass('addGrpMcqField').addClass('delGrpMcqField');
      parentGrpThis.parents('.mcq-single-group-container-plus-add').find('.addgrpMcqbtn').text('Delete Step');


      //remove multiple delete button
      if ($(this).parents('.mcq-single-group-container-plus-add').find('.delGrpMcqField').length > 1) {
        $(this).parents('.mcq-single-group-container-plus-add').find('.delGrpMcqField:last').remove();
      }

    })

    /*Add new field*/
    $('body').on('click', '.addMcqField', function () {

      var parentThis = $(this);


      /*Check previous data counts option attr*/
      if ($('.mcq-single-group-container-plus-add').length == 1) {
        var arrayGrpIdRow = 0;
      }
      else {
        var arrayGrpIdRow = $(this).parents('.mcq-single-group-container-plus-add').prev('mcq-single-question-container-plus-add').attr('data-count');
      }


      if ($(this).parents('.mcq-single-question-container-plus-add').prev('.mcq-single-question-container-plus-add').length == 0) {
        var arrayGrpIdCol = 0;
      }
      else {
        var arrayGrpIdCol = $(this).parents('.mcq-single-question-container-plus-add').prev('.mcq-single-question-container-plus-add').attr('data-count') + 1;
      }


      /*Before Adding New Field, Need to check existing field is not empty*/
      var errorMessageAr = [];

      if (parentThis.parents('.mcq-single-question-container-plus-add').find($('.mcq_askque')).val() == "") {
        var currentThis = parentThis.parents('.mcq-single-question-container-plus-add').find($('.mcq_askque'));
        error = "Question field is empty";
        errorMessageAr.push(error);
        parentThis.parents('.mcq-single-question-container-plus-add').find('.mcq-single-question-inner-container').show();
        formBuilder.mcqvalidationEnquiry(parentThis, currentThis, errorMessageAr);
        return false;
      }
      else if (parentThis.parents('.mcq-single-question-container-plus-add').find($('.mcqtagoptions option:selected')).val() == 0) {
        var currentThis = parentThis.parents('.mcq-single-question-container-plus-add').find($('.mcqtagoptions'));
        error = "Please select Option";
        errorMessageAr.push(error);
        parentThis.parents('.mcq-single-question-container-plus-add').find('.mcq-single-question-inner-container').show();
        formBuilder.mcqvalidationEnquiry(parentThis, currentThis, errorMessageAr);
        return false;
      }
      else {
        var currentThis = '';
        formBuilder.mcqvalidationEnquiry(parentThis, currentThis, errorMessageAr);
      }


      // Hide before creating new field
      $(this).parents('.mcq-single-question-container-plus-add').find('.mcq-single-question-inner-container').hide();
      $(this).parents('.mcq-single-question-container-plus-add').after(startHtmlmcq);
      var prevFieldDataCount = $(this).parents('.mcq-single-question-container-plus-add').attr('data-count');
      $(this).parents('.mcq-single-question-container-plus-add').next().attr('data-count', parseInt(prevFieldDataCount) + 1);
      // Show new field after creating new field using add new btn
      $(this).parents('.mcq-single-question-container-plus-add').next().find('.mcq-single-question-inner-container').show();
      parentThis.parents('.mcq-single-question-container-plus-add').find('.addMcqField').removeClass('addMcqField').addClass('delEnqField');
      parentThis.parents('.mcq-single-question-container-plus-add').find('.enqBtnName').text('x');

      //Code for adding delete btn for all other fields
      varTargetAllFields = parentThis.parents('.mcq-single-question-container-plus-add').prevAll('.mcq-single-question-container-plus-add');
      varTargetAllFields.find('.addMcqField').removeClass('addMcqField').addClass('delEnqField');
      varTargetAllFields.find('.enqBtnName').text('x');

      //remove multiple delete button 
      if ($(this).parents('.mcq-single-question-container-plus-add').find('.delEnqField').length > 1) { $(this).parents('.mcq-single-question-container-plus-add').find('.delEnqField:last').remove(); }
    });

  },
  mcqDelForms: function () {

    /*$('body').on('click','.delEnqField',function(){
    var parentThis = $(this);
    $(this).parents('.mcq-single-question-container-plus-add').remove();
    });*/

  },
  mcqGrpDelForms: function () {

    $('body').on('click', '.delGrpMcqField', function () {
      var parentgrpThis = $(this);
      $(this).parents('.mcq-single-group-container-plus-add').remove();


      //check steps have add step btn to last element 
      var lastElementWihtoutStepBTN = $('.enquiry-form-wrapper').find('.mcq-single-group-container-plus-add').last().find('.addGrpMcqField').length;

      //check only one step left on the page. Prevent it from deletion.
      console.log($('.enquiry-form-wrapper').find('.mcq-single-group-container-plus-add').length);
      if ($('.enquiry-form-wrapper').find('.mcq-single-group-container-plus-add').length == 1) {
        $('.enquiry-form-wrapper').find('.addgrpMcqbtn').text('Add Step');
        $('.enquiry-form-wrapper').find('.addGrpMcqField').remove();
        $('.enquiry-form-wrapper').find('.delGrpMcqField').addClass('addGrpMcqField').removeClass('delGrpMcqField');
      }
      else if (lastElementWihtoutStepBTN == 0) {
        $('.enquiry-form-wrapper').find('.mcq-single-group-container-plus-add').last().find('.delGrpMcqField').after('<a href="javascript:void(0)" id="" class="button button-primary button-large addGrpMcqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="addgrpMcqbtn">Add Step</span></a>');
      }

    });

  },
  saveMcqForms: function () {


    $('body').on('click', '.saveMcqForm', function () {
      var errorMessageAr = [];
      validateStatus = true;

      $(this).parents('#mcq-form').find('.border-red-textbox').removeClass('border-red-textbox');
      $(this).parents('#mcq-form').find('.errorEnqMsgOuter').html('');
      $(this).parents('#mcq-form').find('.errorMcqMsgInner').html('');




      /*Check text to display should not empty*/
      /* if($('#headertitle').val() ==""){               
       $('#headertitle').addClass('border-red-textbox');         
         validateStatus =false;
       }
       else{
       $('#headertitle').removeClass('border-red-textbox');
       }*/

      /*Check form name field should not empty*/
      if ($('#formname').val() == "") {
        $('#formname').addClass('border-red-textbox');
        validateStatus = false;
      }
      else {
        $('#formname').removeClass('border-red-textbox');
      }

      $('#mcq-form').find('input,select').each(function () {

        if ($(this).is('select')) {

          if ($('option:selected', this).val() == 0) {
            $(this).addClass('border-red-textbox');
            $(this).parents('.mcq-single-question-inner-container').show();
            $(this).parents('.mcq-single-group-container-plus-add-inner-toggle').show();
            $(this).parents('.formtype-toggle').show();
            validateStatus = false;
            error = "Check Red Required Fields";
            errorMessageAr.push(error);
          }
        }
        else if ($(this).is('input') && !($(this).hasClass('mcqgrporder'))) {
          if ($(this).val() == "") {
            $(this).addClass('border-red-textbox');
            $(this).parents('.mcq-single-question-inner-container').show();
            $(this).parents('.mcq-single-group-container-plus-add-inner-toggle').show();
            $(this).parents('.formtype-toggle').show();
            validateStatus = false;
            error = "Check Red Required Fields";
            errorMessageAr.push(error);
          }

        }

      });

      /*Check style fields are not empty except return url*/
      $('#styleForm').find('input,select,textarea').not("#thnku_url").each(function () {

        if ($(this).is('input')) {

          if ($(this).val() == "") {
            $(this).addClass('border-red-textbox');
            $(this).parents('.edit-form-slide').show();
            $(this).parents('.edit-form-slide').prev().find('i').toggleClass('fa-sort-desc').toggleClass('fa-sort-asc');
            validateStatus = false;
          } else {
            $(this).removeClass('border-red-textbox');
          }
        }
      });




      $('.thnku_url').each(function () {
        if (!($(this).attr('style') == 'display: none;')) {
          if ($(this).val() == "") {
            $(this).addClass('border-red-textbox');
            $(this).parents('.edit-form-slide').show();
            $(this).parents('.edit-form-slide').prev().find('i').toggleClass('fa-sort-desc').toggleClass('fa-sort-asc');
            validateStatus = false;
          } else {
            $(this).removeClass('border-red-textbox');
          }
        }
      });

      /*Check at least one answer is selected */

      $('#mcq-form').find('input').each(function () {

        var atleastOneChecked = 0;
        if ($(this).hasClass('mcq-answer')) {
          var atleastOneChecked = 0;
          $(this).parents('.mcq-text-group').find('.mcq-answer:checked').each(function () {
            atleastOneChecked = $(this).parents('.mcq-text-group').find('.mcq-answer:checked').length;
          })
          if (
            (atleastOneChecked != "undefined")
            &&
            (atleastOneChecked > 0)
          ) {

          }
          else if (atleastOneChecked == 0) {
            $(this).parents('.mcq-text-group').find('.mcq-answer').addClass('border-red-textbox');
            $(this).parents('.mcq-single-question-inner-container').show();
            $(this).parents('.mcq-single-group-container-plus-add-inner-toggle').show();
            error = "Select atleast one answer";
            errorMessageAr.push(error);
            validateStatus = false;
          }

        }
      });

      /*Check user option fields are not empty if show form*/
      var show_form = $('#userformShow').val();
      if (show_form == 1) {
        $('#user-form').find('input,select').each(function () {

          if ($(this).is('select')) {

            if ($('option:selected', this).val() == 0) {
              $(this).addClass('border-red-textbox');
              $(this).parents('.user-inner-container').show();
              validateStatus = false;
              error = "Check Red Required Fields";
              errorMessageAr.push(error);
            }
          }
          else if ($(this).is('input')) {
            if ($(this).val() == "") {
              $(this).addClass('border-red-textbox');
              $(this).parents('.user-inner-container').show();
              validateStatus = false;
              error = "Check Red Required Fields";
              errorMessageAr.push(error);
            }

          }
        });
      }

      if (!validateStatus) {


        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }

        var errorMessageAr = errorMessageAr.filter(onlyUnique);
        currentThis = "";
        var parentThis = $(this);

        formBuilder.mcqvalidationEnquiry(parentThis, currentThis, errorMessageAr);
        return;
      }
      else {
        var parentThis = $(this);
        var currentThis = '';
        formBuilder.mcqvalidationEnquiry(parentThis, currentThis, errorMessageAr);
        formBuilder.ajaxMcqForm();
      }
    });


  },
  validateNumber: function () {

    $('body').on('blur', '[name="group_order[]"]', function () {

      if (!$.isNumeric(this.value) && !(this.value == '')) {
        $('.tempNotify').remove();
        this.value = '';
        $(this).after('<span style="color:red;float:right;margin-top: 0px;font-size: 13px;text-align: left;" class="tempNotify">Allow number only</span>');
        setTimeout(function () { $('.tempNotify').remove(); }, 2000);

      }
      else if (this.value > 32767) {
        this.value = '';
        $('.tempNotify').remove();
        $(this).after('<span style="color:red;float:right;margin-top: 0px;font-size: 13px;text-align: center;font-size: 13px;text-align: left;" class="tempNotify">Allow number less than 32767</span>');
        setTimeout(function () { $('.tempNotify').remove(); }, 2000);
      }
      else if (this.value) {

        orderArr = [];
        jQuery('[name="group_order[]"]').each(function () {
          orderArr.push($(this).val());
        });
        var mf = 0;
        var m = 0;
        var item;
        for (var i = 0; i < orderArr.length; i++) {

          if (orderArr[i] == this.value && orderArr[i] != '') {
            mf++;
          }
          /*for (var j=i; j<orderArr.length; j++)
          {
              if (orderArr[i] == orderArr[j])
               m++;
              if (mf<m)
              {
                mf=m; 
                item = orderArr[i];
              }
          }*/
          m = 0;
        }
        if (mf > 1) {
          this.value = '';
          $('.tempNotify').remove();
          $(this).after('<span style="color:red;float:right;margin-top: 0x;font-size: 13px;text-align: left;" class="tempNotify">Please use unique number.</span>');
          setTimeout(function () { $('.tempNotify').remove(); }, 2000);
        }
        else {
          $(this).removeClass('border-red-textbox');
        }
        console.log(mf);
      }
      else {
        $(this).removeClass('border-red-textbox');
      }

    });

    $('body').on('blur', '[name="group_enq_order[]"]', function () {

      $(this).attr('value', '');
      if (!$.isNumeric(this.value) && !(this.value == '')) {
        $('.tempNotify').remove();
        this.value = '';
        $(this).after('<span style="color:red;float:right;margin-top: 0px;font-size: 13px;text-align: left;" class="tempNotify">Allow number only</span>');
        setTimeout(function () { $('.tempNotify').remove(); }, 2000);
      }
      else if (this.value > 32767) {
        this.value = '';
        $('.tempNotify').remove();
        $(this).after('<span style="color:red;float:right;margin-top: 0px;font-size: 13px;text-align: left;" class="tempNotify">Allow number less than 32767</span>');
        setTimeout(function () { $('.tempNotify').remove(); }, 2000);
      }
      else if (this.value) {
        orderArr = [];
        $('[name="group_enq_order[]"]').each(function () {
          orderArr.push($(this).val());
        });
        var mf = 0;
        var m = 0;
        var item;
        for (var i = 0; i < orderArr.length; i++) {
          if (orderArr[i] == this.value && orderArr[i] != '') {
            mf++;
          }
          m = 0;
        }
        if (mf > 1) {
          this.value = '';
          $('.tempNotify').remove();
          $(this).after('<span style="color:red;float:right;margin-top: 0px;font-size: 13px;text-align: left;" class="tempNotify">Please use unique number.</span>');
          setTimeout(function () { $('.tempNotify').remove(); }, 2000);
        }
        else {
          //check largest existing number
          var existingMaxNumber = Math.max(...orderArr);
          var newNumber = this.value;
          if (existingMaxNumber > newNumber) {
            formBuilder.rearrangeClub();
          }

          $(this).removeClass('border-red-textbox');
        }

      }
      else {
        $('body .removeClub').trigger("click");  //remove clubbed steps
        $(this).removeClass('border-red-textbox');
      }
    });
  },
  mcqvalidationEnquiry: function (addfieldbtn, currentThis, messageAr) {
    if (addfieldbtn) {

      //If save field is clicked 
      if (addfieldbtn.hasClass('saveMcqForm')) {
        addfieldbtn.parents('#mcq-form').find('.errorMcqMsgOuter').html('');
        addfieldbtn.parents('.mcq-form').find('.errorMcqMsgInner').html('');
        var message = messageAr.join('<br>');
        addfieldbtn.parents('#mcq-form').find('.errorMcqMsgOuter').removeClass('success_response');
        addfieldbtn.parents('#mcq-form').find('.errorMcqMsgOuter').addClass('error_response');
        addfieldbtn.parents('#mcq-form').find('.errorMcqMsgOuter').html(message);
        return;
      }

      //If add field is clicked 
      addfieldbtn.parents('.mcq-single-question-container-plus-add').find('.border-red-textbox').removeClass('border-red-textbox');
      addfieldbtn.parents('.mcq-form').find('.errorMcqMsgInner').html('');
      addfieldbtn.parents('.mcq-form').find('.errorMcqMsgOuter').html('');
      var message = messageAr.join('<br>');
      addfieldbtn.parents('.mcq-form').find('.errorMcqMsgInner').removeClass('success_response');
      addfieldbtn.parents('.mcq-form').find('.errorMcqMsgInner').addClass('error_response');
      addfieldbtn.parents('.mcq-form').find('.errorMcqMsgInner').html(message);

    }

    if (currentThis != "") {
      currentThis.addClass('border-red-textbox');
    }




  },
  ajaxMcqForm: function () {


    var form_location = $.trim($('#formLocation').val());
    var show_form = $.trim($('#userformShow').val());
    //var treeInnerHTML = $("#enquiry-form").html();
    var formDataArray = $('form#mcq-form').serializeArray();

    /*Make array to store all the data in chunks*/

    /*Script for storing Form type*/
    var formType = $.trim($('#aformtype option:selected').val());
    /*Script for storing Form name*/
    //var formName = $.trim($('#bformname').val());
    var formName = $.trim(jQuery('#formname').val());

    /*Script for storing Array of Group Name*/
    var arrayGroupName = [];
    $('.mcq-single-group-container-plus-add').find('.mcqgrpname').each(function (i, val) {
      arrayGroupName[i] = $.trim($(this).val());

    });

    /*Script for storing Array of Group Unique Step Id*/
    var arrayStepUniqueId = [];
    $('.mcq-single-group-container-plus-add').each(function (i, val) {
      arrayStepUniqueId[i] = $(this).attr('unique-step-id');
    });


    /*Script for storing text to display*/

    var texttodisplay = CKEDITOR.instances['headertitle'].getData();
    var footertexttodisplay = CKEDITOR.instances['footertitle'].getData();

    /*Script for storing Array of Group Order*/
    var arrayGroupOrder = [];
    $('.mcq-single-group-container-plus-add').find('#mcqgrporder').each(function (i, val) {
      arrayGroupOrder[i] = $.trim($(this).val());

    });

    /*Script for storing Array of Questions */
    var arrayQuestions = [];
    $('.mcq-single-group-container-plus-add').each(function (i) {
      arrayQuestions[i] = [];
      $(this).find('input[name="mcq_askque[]"]').each(function (j, val) {
        arrayQuestions[i][j] = $.trim(val['value']);
      })
    });

    /*Script for storing Array of optiontypes */
    var arrayOptiontypes = [];
    $('.mcq-single-group-container-plus-add').each(function (i, val) {
      arrayOptiontypes[i] = [];
      $(this).find('.mcqtagoptions').each(function (j, val) {
        arrayOptiontypes[i][j] = $.trim(($("option:selected", this)).val());
      })
    });

    /*Script for storing Array of options */
    var arrayOptions = [];
    $('.mcq-single-group-container-plus-add').each(function (i, val1) {
      arrayOptions[i] = [];
      $(this).find('.mcq-single-question-container').each(function (j, val2) {
        arrayOptions[i][j] = [[]];
        $(this).find('.enquirytextval').each(function (k, val3) {
          arrayOptions[i][j][k] = $.trim(val3['value']);
        });
      })
    });

    /*Script for storing Array of options answers */
    var arrayOptionsAnswers = [];
    $('.mcq-single-group-container-plus-add').each(function (i, val1) {
      arrayOptionsAnswers[i] = [];
      $(this).find('.mcq-single-question-container').each(function (j, val2) {
        arrayOptionsAnswers[i][j] = [[]];
        $(this).find('.mcq-answer').each(function (k, val3) {

          if ($(this).is(':checked')) {
            arrayOptionsAnswers[i][j][k] = "1";

          }
          else {
            arrayOptionsAnswers[i][j][k] = "0";
          }

          //arrayOptionsAnswers[i][j][k] = val3['value'];;
        });
      })
    });


    /*Script for storing Array of required*/
    var arrayRequired = [];
    $('.mcq-single-group-container-plus-add').each(function (i, val) {
      arrayRequired[i] = [];
      $(this).find('.mcqisrequired').each(function (j, val) {

        if ($(this).is(':checked')) {
          arrayRequired[i][j] = "1";

        }
        else {
          arrayRequired[i][j] = "0";
        }
      });
    });


    var userdetailsArr = [];
    var userdetailsArr = formBuilder.readUserDetails();

    /*Script for storing Array of styles*/
    var seriesStyle = $('[name="styleForm"]').serializeArray();
    var seriesStyleinJson = {};
    $(seriesStyle).each(function (index, obj) {
      seriesStyleinJson[obj.name] = obj.value;
    });

    var seriesEmailForminJson = [];
    var seriesEmailForm = $('[name="emailForm"]').serializeArray();
    seriesEmailForm.forEach(function (value) {
      var existing = seriesEmailForminJson.filter(function (v, i) {
        return v.name == value.name;
      });
      if (existing.length) {
        var existingIndex = seriesEmailForminJson.indexOf(existing[0]);
        seriesEmailForminJson[existingIndex].value = seriesEmailForminJson[existingIndex].value.concat(value.value);
      } else {
        if (typeof value.value == 'string')
          value.value = [value.value];
        seriesEmailForminJson.push(value);
      }
    });




    //Send flag to notify, we are editing
    var checkFlag, editId, checkCloneUpdate, siteId, blockId;;
    if ($('[name="checkFlag"]').length == 0) {
      checkFlag = 'add';
      checkCloneUpdate = $.trim($('[name="checkCloneUpdate"]').val());
      siteId = $.trim($('[name="siteId"]').val());
      blockId = $.trim($('[name="blockId"]').val());
    }
    else {
      checkFlag = $.trim($('[name="checkFlag"]').val());
      editId = $.trim($('[name="editId"]').val());
      /*Cloning purpose update form inside txt file*/
      checkCloneUpdate = $.trim($('[name="checkCloneUpdate"]').val());
      siteId = $.trim($('[name="siteId"]').val());
      blockId = $.trim($('[name="blockId"]').val());
    }

    $('.saveCalltoWhichForm #credit_card_loading').show();
    $('.saveCalltoWhichForm #credit_card_title').hide();
    $('.saveCalltoWhichForm').attr('disabled', 'disabled');
    $.ajax({
      type: 'POST',
      dataType: 'html',
      url: siteUrl + "formbuilder/save",
      data: {
        formType: formType, formName: formName,
        arrayGroupName: arrayGroupName, arrayGroupOrder: arrayGroupOrder,
        arrayQuestions: arrayQuestions, arrayOptions: arrayOptions,
        arrayOptionsAnswers: arrayOptionsAnswers,
        arrayOptiontypes: arrayOptiontypes,
        arrayRequired: arrayRequired, userdetailsArr: userdetailsArr,
        form_location: form_location, show_form: show_form, checkFlag: checkFlag, editId: editId, seriesStyleinJson: seriesStyleinJson, texttodisplay: texttodisplay, footertexttodisplay: footertexttodisplay, arrayUniqueId: arrayStepUniqueId, seriesEmailForminJson: seriesEmailForminJson, checkCloneUpdate: checkCloneUpdate, siteId: siteId, blockId: blockId
      },
      success: function (data) {
        var ret = jQuery.parseJSON(data);
        $('.saveCalltoWhichForm #credit_card_loading').hide();
        $('.saveCalltoWhichForm #credit_card_title').show();
        $('.saveCalltoWhichForm').attr('disabled', 'false');
        window.scrollTo(0, 0);
        if (ret.responseCode == 0) {//error          
          $('.common-messages').html(ret.responseHTML);
        } else if (ret.responseCode == 1) {//all is well

          $('.saveMcqForm').prop('disabled', true);
          $('.saveEnquiryForm').prop('disabled', true);
          $('.common-messages').html(ret.responseHTML);
          if (ret.backToSite == 1) {
            $('#cancelbacktosite')[0].click();

          }
          //If clone make back to review btn show on the same edit page
          if (ret.responseClone) {
            $('.saveMcqForm').prop('disabled', false);
            $('.saveEnquiryForm').prop('disabled', false);
          }
          else {
            location.href = siteUrl + "formbuilder";
          }
        }

        //
      },
      error: function (req, status, error) { }
    });

  },
  deleteFormByid: function () {

    /*Assign Plan Script*/
    $('[href="#deleteFormModal"]').removeClass('disabled');

    $('[href="#deleteFormModal"]').click(function () {
      var tempVal = $(this).attr('data-planid');
      $('#deletePlanButton').attr('data-planid', tempVal);
    });


    $('#deletePlanButton').click(function () {

      var tempVal = $(this).attr('data-planid');
      $.ajax({
        url: siteUrl + "Formbuilder/delCurForm",
        type: "POST",
        dataType: 'json',
        data: { temp: tempVal }
      }).done(function (res) {

        if (res.code == 1) {
          location.reload();
          /*$('#modal-plans').removeClass();
          $('#modal-plans').addClass('success');
          $('#modal-plans').html(res.message);*/
        } else {
          $('#modal-plans').removeClass();
          $('#modal-plans').addClass('success');
          $('#modal-plans').addClass('error');
          $('#modal-plans').html(res.message);
        }
      });
    });
  },
  readUserFieldSettingHtml: function () {
    var startHtml;
    startHtml = '<div class="user-single-question-container-plus-add"><div class="user-container"><div class="parent-user-accordion"><h5 class="h5-accordion">User Field</h5><i class="fa white-color-icon white-color-user-icon fa-sort-asc" aria-hidden="true"></i></div><a href="javascript:void(0)" id="user-next-button" class="button button-primary button-large addUserField"><span id="credit_card_loading"><img src="">Processing...</span><span class="userBtnName">+</span></a><div class="user-inner-container" style="display: block;"><div class="jk_st_inner_cont no-border user_option_type"><span for="tagoptions" class="label-show-form width-10">Option</span><div class="jk_st_opt_cont jk_input-padding"><select id="usertagoptions" name="usertagoptions[0]" class="browser-default usertagoptions"><option value="0">Select option</option><option value="1">Text</option><option value="2">Radio</option><option value="3">Checkbox</option></select></div></div><div class="optionsusercontainer"></div><div id="is-required"></div></div></div></div>';
    return startHtml;
  },
  readEnquiryFieldGroupSettingHtml: function () {
    var startHtmlenq = [];
    var stepuniqueId = formBuilder.guid();
    startHtmlenq.push('<div class="enq-single-question-container-plus-add" data-count="0"><div class="single-question-container"><div class="parent-accordion"><h5 class="h5-accordion">Field Setting</h5><i class="fa white-color-icon fa-sort-asc" aria-hidden="true"></i></div><div class="single-question-inner-container" style="display: none;"><div class="jk_st_inner_cont no-border question_name"> <span for="labe-question" class="label-show-form">Question</span><div class="cus-full-width jk_st_opt_cont margin-bottom-12"><input type="text" class="jk_st_inner_cont askque" placeholder="Ask Question" id="labe-question" name="askque[]" value=""></div></div><div class="jk_st_inner_cont no-border question_type"><span for="tagoptions" class="label-show-form width-22">Option</span><div class="jk_st_opt_cont jk_input-padding"><select id="tagoptions" name="tagoptions[0]" class="browser-default ctagoptions margin-bottom-12"><option value="0">Select option</option><option value="17">Button</option><option value="3">Checkbox</option><option value="16">Date Picker</option><option value="10">Dropdown</option><option value="4">Email</option><option value="5">First Name</option><option value="15" class="insurance_special_fields">Insurance Company</option><option value="6">Last Name</option><option value="7">Phone</option><option value="2">Radio</option><option value="1">Text</option><option value="18">Textarea</option><option value="12" class="insurance_special_fields">Vehicle Make</option><option value="13" class="insurance_special_fields">Vehicle Model</option><option value="14" class="insurance_special_fields">Vehicle body type</option><option value="11" class="insurance_special_fields">Year</option><option value="8">Zip</option></select></div><div class="custom_name_wrapper hideinsurance"><input class="custom_name_wrapper_input" type="text" placeholder="Enter field name" name="custom_name[]"></div></div><div class="optionscontainer"></div><div id="is-required"></div></div></div><a  title="Add Question" href="javascript:void(0)" id="enquiry-next-button" class="button button-primary button-large addEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span title="Add Question" class="enqBtnName">+</span></a><a href="javascript:void(0)" title="Delete Question" id="enquiry-next-button" class="button button-primary button-large delEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="enqBtnName" title="Delete Question">x</span></a></div>');
    startHtmlenq.push('<div class="enq-single-group-container-plus-add" data-count="0" unique-step-id=' + stepuniqueId + '><div class="parent-enqgrp-accordion"><h5 class="h5-accordion">Step</h5><i class="fa white-color-grp-icon fa-sort-asc" aria-hidden="true"></i></div><a href="javascript:void(0)" id="" class="button button-primary button-large delGrpEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="addgrpEnqbtn">Delete Step</span></a><a href="javascript:void(0)" id="" class="button button-primary button-large addGrpEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="addgrpEnqbtn">Add Step</span></a><div class="enq-single-group-container-plus-add-inner-toggle" style="display: none;"><div class="jk_st_opt_cont jk_input-padding mcq-group-class common-group-input  step-name-wrapper"><span for="enqgrpname" class="active label-show-form">Step Name:</span><input id="enqgrpname" class="enqgrpname" type="text" placeholder="Enter step name" name="group_name[]"></div><div class="jk_st_opt_cont jk_input-padding mcq-group-class enqgrporder  common-group-input margin-bottom-12"><span for="enqgrporder" class="active label-show-form">Step Order:</span><input id="enqgrporder" class="enqgrporder cus-full-three" type="text" name="group_enq_order[]"></div><div class="imageUploader">  <input id="file" class="files" type="file" /><i class="fa fa-image"></i></div><div class="enq-single-question-container-plus-add" data-count="0"><div class="single-question-container"><div class="parent-accordion"><h5 class="h5-accordion">Field Setting</h5><i class="fa white-color-icon fa-sort-asc" aria-hidden="true"></i></div><div class="single-question-inner-container" style="display: none;"><div class="form-group jk_st_inner_cont no-border question_name"> <span for="labe-question" class="label-show-form">Question</span><div class="cus-full-width jk_st_opt_cont margin-bottom-12"><input type="text" class="jk_st_inner_cont askque" placeholder="Ask Question" id="labe-question" name="askque[]" value=""></div></div><div class="jk_st_inner_cont no-border question_type"><span for="tagoptions" class="label-show-form width-22">Option</span><div class="jk_st_opt_cont jk_input-padding"><select id="tagoptions" name="tagoptions[0]" class="browser-default ctagoptions margin-bottom-12"><option value="0">Select option</option><option value="17">Button</option><option value="3">Checkbox</option><option value="16">Date Picker</option><option value="10">Dropdown</option><option value="4">Email</option><option value="5">First Name</option><option value="15" class="insurance_special_fields">Insurance Company</option><option value="6">Last Name</option><option value="7">Phone</option><option value="2">Radio</option><option value="1">Text</option><option value="18">Textarea</option><option value="12" class="insurance_special_fields">Vehicle Make</option><option value="13" class="insurance_special_fields">Vehicle Model</option><option value="14" class="insurance_special_fields">Vehicle body type</option><option value="11" class="insurance_special_fields">Year</option><option value="8">Zip</option></select></div><div class="custom_name_wrapper hideinsurance"><input class="custom_name_wrapper_input" type="text" placeholder="Enter field name" name="custom_name[]"></div></div><div class="optionscontainer"></div><div id="is-required"></div></div></div><a href="javascript:void(0)" id="enquiry-next-button" class="button button-primary button-large addEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="enqBtnName" title="Add Question">+</span></a></div></div></div>');
    return startHtmlenq;
  },
  readMcqFieldGroupSettingHtml: function () {
    var startHtmlmcq = [];
    var stepuniqueId = formBuilder.guid();
    startHtmlmcq.push('<div class="mcq-single-question-container-plus-add" data-count="0"><div class="mcq-single-question-container"><div class="parent-accordion"><h5 class="h5-accordion">Field Setting</h5><i class="fa white-color-icon fa-sort-asc" aria-hidden="true"></i></div><div class="mcq-single-question-inner-container" style="display: none;"><div class="jk_st_inner_cont no-border question_name"> <span for="labe-question" class="label-show-form">Question</span><div class="cus-full-width jk_st_opt_cont margin-bottom-12"><input type="text" class="jk_st_inner_cont mcq_askque" placeholder="Ask Question" id="labe-question" name="mcq_askque[]" value=""></div></div><div class="jk_st_inner_cont no-border question_type"><span for="tagoptions" class="label-show-form width-22">Option</span><div class="jk_st_opt_cont jk_input-padding"><select id="tagoptions" name="tagoptions[0]" class="browser-default mcqtagoptions margin-bottom-12"><option value="0">Select option</option><option value="2">Radio</option><option value="3">Checkbox</option></select></div></div><div class="optionscontainer"></div><div id="is-required"></div></div></div><a href="javascript:void(0)" id="enquiry-next-button" class="button button-primary button-large delEnqField" title="Delete Question"><span id="credit_card_loading"><img src="">Processing...</span><span class="enqBtnName" title="Delete Question">x</span></a><a href="javascript:void(0)" id="enquiry-next-button" class="button button-primary button-large addMcqField" title="Add Question"><span id="credit_card_loading"><img src="">Processing...</span><span class="enqBtnName" title="Add Question">+</span></a></div>');
    startHtmlmcq.push('<div class="mcq-single-group-container-plus-add" data-count="0" unique-step-id=' + stepuniqueId + '><div class="parent-mcqgrp-accordion"><h5 class="h5-accordion">Step</h5><i class="fa white-color-grp-icon fa-sort-asc" aria-hidden="true"></i></div><a href="javascript:void(0)" id="" class="button button-primary button-large delGrpMcqField"><span id="credit_card_loading"><img src="' + siteUrl + '/images/rapify_img/loading-img.gif">Processing...</span><span class="addgrpMcqbtn">Delete Step</span></a><a href="javascript:void(0)" id="" class="button button-primary button-large addGrpMcqField"><span id="credit_card_loading"><img src="' + siteUrl + '/images/rapify_img/loading-img.gif">Processing...</span><span class="addgrpMcqbtn">Add Step</span></a><div class="mcq-single-group-container-plus-add-inner-toggle" style="display: none;"><div class="jk_st_opt_cont jk_input-padding mcq-group-class  common-group-input  step-name-wrapper"><span for="mcqgrpname" class="active  label-show-form">Step Name:</span><input id="mcqgrpname" class="mcqgrpname" type="text" placeholder="Enter step name" name="group_name[]"></div><div class="jk_st_opt_cont jk_input-padding mcq-group-class mcqgrporder common-group-input margin-bottom-12"><span for="mcqgrporder" class="active label-show-form">Step Order:</span><input id="mcqgrporder" class="mcqgrporder cus-full-three" type="text" name="group_order[]"></div><div class="mcq-single-question-container-plus-add" data-count="0"><div class="mcq-single-question-container"><div class="parent-accordion"><h5 class="h5-accordion">Field Setting</h5><i class="fa white-color-icon fa-sort-asc" aria-hidden="true"></i></div><div class="mcq-single-question-inner-container" style="display: none;"><div class="jk_st_inner_cont no-border question_name"> <span for="labe-question" class="label-show-form">Question</span><div class="cus-full-width jk_st_opt_cont margin-bottom-12"><input type="text" class="jk_st_inner_cont mcq_askque" placeholder="Ask Question" id="labe-question" name="mcq_askque[]" value=""></div></div><div class="jk_st_inner_cont no-border question_type"><span for="tagoptions" class="label-show-form  width-22">Option</span><div class="jk_st_opt_cont jk_input-padding"><select id="tagoptions" name="tagoptions[0]" class="browser-default mcqtagoptions margin-bottom-12"><option value="0">Select option</option><option value="2">Radio</option><option value="3">Checkbox</option></select></div></div><div class="optionscontainer"></div><div id="is-required"></div></div></div><a href="javascript:void(0)"  title="Add Question" id="enquiry-next-button" class="button button-primary button-large addMcqField"><span id="credit_card_loading"><img src="' + siteUrl + '/images/rapify_img/loading-img.gif">Processing...</span><span class="enqBtnName"  title="Add Question">+</span></a></div></div></div>');
    return startHtmlmcq;
  },
  getActiveCampaigns: function () {
    var value = $(this).val();
    //var value = $('[name=email_market]').val();
    $.ajax({
      url: siteUrl + "integration/fetchActiveCampaigns",
      type: "POST",
      dataType: "json",
      data: { autoresponder_value: value },
    }).done(function (result) {
      if (result.code == 1) {
        formBuilder.AppendAndShowCampaigns(result.data, value);
        $('[name="all_active_campaign"]').show();

        $.ajax({
          url: siteUrl + "integration/fetchActiveCampaignsApi",
          type: "POST",
          dataType: "json",
          data: { autoresponder_value: value },
        }).done(function (result1) {

          var obj = $.parseJSON(result1);
          if(value== 'Gotowebinar'){ 
            $('.api_code').val(result1);
            $('.api_val').val(obj[2].value);
            $('.api_username').val(obj[0].value);
            $('.api_password').val(obj[1].value);
          }else{
            $('.api_code').val(obj[0].name);
            $('.api_val').val(obj[0].value);
            $('.api_username').val(obj[1].value);
            $('.api_password').val(obj[2].value);
          }
        });
        /*Script for fetching api code as well as value*/
        value
      }
      else if ($("[name=email_market] option:selected")[1].text == "No Email Marketing") {
        $('[name="all_active_campaign"]').find('option').remove();
        $('[name="all_active_campaign"]').hide();
      }
      else {
        $('[name="all_active_campaign"]').find('option').remove();
        $('[name="all_active_campaign"]').append('<option value="0">Select Campaign</option>');
        $('[name="all_active_campaign"]').show();
      }


    });

  },
  changePopupFields: function () {
    $(".thnku_url").val($(this).val());
  },
  AppendAndShowCampaigns: function (data, value) {
    $('[name="all_active_campaign"]').find('option').remove();
    $('.active_campaign').show();
    $('[name="all_active_campaign"]').append('<option value="0">Select Campaign</option>');

    if (value == 'Gotowebinar') {
      for (var key in data) {
        $('[name="all_active_campaign"]').append('<option value="' + data[key].id + '">' + data[key].name + '</option>');
      }
    }//Sendeagle key long so dropdown will create like this:-
    else if (value == 'Sendeagle') {
      for (var key in data) {
        $('[name="all_active_campaign"]').append('<option value="' + data[key].id + '">' + data[key].name + '</option>');
      }
    } else {

      for (var key in data) {
        $('[name="all_active_campaign"]').append('<option value="' + key + '">' + data[key].name + '</option>');
      }
    }
    if (activeSelect != '') {
      $('[name=all_active_campaign] option:contains("' + activeSelect + '")').attr('selected', 'selected');
    }
  },
  clubSteps: function () {
    $('body').on('click', '.stepOrder', function () {
      $(this).toggleClass('selectedclub');
    });
    if ($('#formtheme').val() == '1') {
      $('.wrapper-of-club').show();
      $('.custom_name_wrapper').removeClass('hideinsurance');
      $('.imageUploader').removeClass('hideinsurance');

    } else if ($('#formtheme').val() == '2') {
      $('.wrapper-of-club').hide();
      $('.custom_name_wrapper').addClass('hideinsurance');
      $('.imageUploader').addClass('hideinsurance');
    } else {
      $('.wrapper-of-club').hide();
      $('.custom_name_wrapper').addClass('hideinsurance');
      $('.imageUploader').addClass('hideinsurance');
    }

    $('#formtheme').on('change', function () {
      if ($(this).val() == '1') {
        $('.wrapper-of-club').show();
        $('.custom_name_wrapper').removeClass('hideinsurance');
        $('body .ctagoptions option').each(function () {
          if ($(this).val() == 11 || $(this).val() == 12 || $(this).val() == 13 || $(this).val() == 14 || $(this).val() == 15 || $(this).val() == 17) {
            $(this).removeClass('insurance_special_fields');
          }
        });

      }
      else {
        $('.wrapper-of-club').hide();
        $('.custom_name_wrapper').addClass('hideinsurance');
        $('body .ctagoptions option').each(function () {
          if ($(this).val() == 11 || $(this).val() == 12 || $(this).val() == 13 || $(this).val() == 14 || $(this).val() == 15 || $(this).val() == 17) {
            $(this).addClass('insurance_special_fields');
          }
        });

      }
    });

    //Script for club steps
    //Clubing js
    $('.club-name-add').on('click', function () {
      var arr = [];
      if ($('#clubnameVal').val() != '') {
        if ($('.step-club .selectedclub').length > 0) {
          // if first selected only then add
          if (!$('.step-club .stepOrder').first().hasClass('selectedclub')) {
            alert('You cannot add random (Club Steps). Please select first and its adjacent steps for clubbing it');
            return false;
          }
          //if not random selected club steps
          if ($('.step-club .stepOrder.selectedclub').last().index()
            !=
            ($('.step-club .stepOrder.selectedclub').length) - 1) {
            alert('You cannot add random (Club Steps). Please select first and its adjacent steps for clubbing it');
            return false;
          }
          $('#clubnameVal').removeClass('border-red-textbox');
          var firstnumber;
          firstnumber = parseInt($('.step-club .selectedclub:first').text());

          $('.step-club .selectedclub').each(function () {
            arr.push($(this).text());
            $(this).remove();
          });

          var implodearr = arr.join(',');
          var clubNameval = $('#clubnameVal').val();
          $('#clubnameVal').val('');
          //AI to re-arrange clubname auto in optimal position. Check Index
          var arr2 = [];
          if ($('.available-club-element.td').length > 0) {

            var finished = 0, lastvalueofalreadyaddedsteps;
            $('.available-club-element.td').each(function (ind, val) {
              if (finished == 1) {
                return false;
              }
              arr2 = $(this).find('.clubValue').text().split(',');
              var indexOfclubsec = ind;
              $.each(arr2, function (i, v) {
                if (firstnumber < v) {
                  $('.available-club-element.td').eq(indexOfclubsec).before('<div class="available-club-element td"><div class="clubnameval cus-6">' + clubNameval + '</div><div class="clubValue cus-4">' + implodearr + '</div><div class="removeClub cus-4"><i class="fa fa-times-circle"></i></div></div>');
                  finished = 1;
                  return false;
                }
              });
              lastvalueofalreadyaddedsteps = parseInt(arr2[arr2.length - 1]);

            });
            // if last step number is less than firstnumber added by user.
            if (firstnumber > lastvalueofalreadyaddedsteps) {
              $('.available-club-element.td').last().after('<div class="available-club-element td"><div class="clubnameval cus-6">' + clubNameval + '</div><div class="clubValue cus-4">' + implodearr + '</div><div class="removeClub cus-4"><i class="fa fa-times-circle"></i></div></div>');
            }

          } else {
            $('.available-club-elements').last().after('<div class="available-club-element td"><div class="clubnameval cus-6">' + clubNameval + '</div><div class="clubValue cus-4">' + implodearr + '</div><div class="removeClub cus-4"><i class="fa fa-times-circle"></i></div></div>');
          }



        } else { alert('Please select atleast one club step'); }
      } else {
        $('#clubnameVal').addClass('border-red-textbox');
      }
    });
    //remove element added by user
    $('body').on('click', '.removeClub', function () {
      var arr1 = [];
      arr1 = $(this).parents('.available-club-element').find('.clubValue').text().split(',');
      $.each(arr1, function (i, v) {
        $('.step-club').append('<div class="stepOrder">' + v + '</div>');
      });
      //script for reordering all steps
      var sortValarr = [];
      $('.stepOrder').each(function () {
        sortValarr.push(parseInt($(this).text()));
      });
      var resultsort = sortValarr.sort(function (a, b) { return a - b });

      $('.stepOrder').remove();
      var stepsreorders = '';
      $.each(resultsort, function (i, v) {
        stepsreorders += '<div class="stepOrder">' + v + '</div>';
      });
      $('.step-club').append(stepsreorders);

      $(this).parents('.available-club-element').remove();
    });
    // sort club steps

    /*$(".available-club-elements" ).sortable({
       items: ".td"
    });*/
  },
  imageUpload: function () {

    var crop_max_width = 400;
    var crop_max_height = 400;
    var jcrop_api;
    var canvas;
    var context;
    var image;

    var prefsize;

    $("body").on('change', '.files', function () {
      loadImage(this);
      $('#form').attr('remindStep', $(this).parents('.enq-single-group-container-plus-add').attr('unique-step-id'));
      $('#imageCropModal').show();
      $('#cropOverlay-wrapper').show();
    });


    $("#hideuploadpopup").on('click', function () {
      $('#imageCropModal').hide();
      $('#cropOverlay-wrapper').hide();
      $('.files').val('');

    });

    function loadImage(input) {
      $('.jcropw').text('');
      $('.jcroph').text('');
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        canvas = null;
        reader.onload = function (e) {
          image = new Image();
          image.onload = validateImage;
          image.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
      }
    }

    function dataURLtoBlob(dataURL) {
      var BASE64_MARKER = ';base64,';
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);

        return new Blob([raw], {
          type: contentType
        });
      }
      var parts = dataURL.split(BASE64_MARKER);
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], {
        type: contentType
      });
    }

    function validateImage() {
      if (canvas != null) {
        image = new Image();
        image.onload = restartJcrop;
        image.src = canvas.toDataURL('image/png');
      } else restartJcrop();
    }

    function restartJcrop() {
      if (jcrop_api != null) {
        jcrop_api.destroy();
      }
      $("#views").empty();
      $("#views").append("<canvas id=\"canvas\">");
      canvas = $("#canvas")[0];
      context = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      $("#canvas").Jcrop({
        onSelect: selectcanvas,
        onRelease: clearcanvas,
        boxWidth: crop_max_width,
        boxHeight: crop_max_height,
        onChange: showCords
      }, function () {
        jcrop_api = this;
        console.log(this);
      });
      clearcanvas();
    }

    function showCords(coords) {
      $('.jcropw').text(coords.w);
      $('.jcroph').text(coords.h);
    }

    function clearcanvas() {
      prefsize = {
        x: 0,
        y: 0,
        w: canvas.width,
        h: canvas.height,
      };
    }

    function selectcanvas(coords) {
      console.log(coords);
      prefsize = {
        x: Math.round(coords.x),
        y: Math.round(coords.y),
        w: Math.round(coords.w),
        h: Math.round(coords.h)
      };
    }

    function applyCrop() {
      canvas.width = prefsize.w;
      canvas.height = prefsize.h;
      console.log(canvas.width);
      context.drawImage(image, prefsize.x, prefsize.y, prefsize.w, prefsize.h, 0, 0, canvas.width, canvas.height);
      validateImage();
    }

    function applyScale(scale) {
      if (scale == 1) return;
      canvas.width = canvas.width * scale;
      canvas.height = canvas.height * scale;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      validateImage();
    }

    function applyRotate() {
      canvas.width = image.height;
      canvas.height = image.width;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.translate(image.height / 2, image.width / 2);
      context.rotate(Math.PI / 2);
      context.drawImage(image, -image.width / 2, -image.height / 2);
      validateImage();
    }

    function applyHflip() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.translate(image.width, 0);
      context.scale(-1, 1);
      context.drawImage(image, 0, 0);
      validateImage();
    }

    function applyVflip() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.translate(0, image.height);
      context.scale(1, -1);
      context.drawImage(image, 0, 0);
      validateImage();
    }

    $("#cropbutton").click(function (e) {
      applyCrop();
    });
    $("#scalebutton").click(function (e) {
      var scale = prompt("Scale Factor:", "1");
      applyScale(scale);
    });
    $("#rotatebutton").click(function (e) {
      applyRotate();
    });
    $("#hflipbutton").click(function (e) {
      applyHflip();
    });
    $("#vflipbutton").click(function (e) {
      applyVflip();
    });

    $("body").on('click', '.removeprevImg', function () {
      $(this).parents('.imageUploader').find('#file').show();
      $(this).parents('.imageUploader').find('#file').val('');
      $(this).parents('.imageUploader').find('.fa-image').show();
      $(this).parents('.imageUploader').find('.quiz_preview_img').remove();
    });

    $("#form").submit(function (e) {
      e.preventDefault();
      formData = new FormData($(this)[0]);
      var blob = dataURLtoBlob(canvas.toDataURL('image/png'));

      //---Add file blob to the form data
      formData.append("cropped_image[]", blob);
      $.ajax({
        url: siteUrl + "formbuilder/cropImageUpload",
        type: "POST",
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
          var ret = jQuery.parseJSON(data);
          if (ret.code == 1) {
            var targetedSteps = $('#form').attr('remindstep');
            var imgHtml = '<div class="quiz_preview_img"><img src="' + ret.imagepath + '"><span class="removeprevImg"><i class="fa fa-times-circle"></i></span></div>';
            $("body .enq-single-group-container-plus-add").each(function () {
              if ($(this).attr('unique-step-id') == targetedSteps) {
                $(this).find('.quiz_preview_img').remove();
                $(this).find('.imageUploader').append(imgHtml);
                $(this).find('#file').hide();
                $(this).find('.fa-image').hide();

              }
            });
            $('#imageCropModal').hide();
            $('#cropOverlay-wrapper').hide();
          }
          //alert("Success");
        },
        error: function (data) {
          alert("Error");
        },
        complete: function (data) { }
      });
    });

  }, rearrangeClub: function () {
    //remove steps order that was not unique
    $('body .removeClub').trigger("click");  //remove clubbed steps and modified order steps number
    $('.stepOrder').remove();
    var arr2 = [];
    $('body [name="group_enq_order[]"]').each(function () {
      if (!isNaN(parseInt($(this).val()))) {
        arr2.push(parseInt($(this).val()));
      }
    });

    $.each(arr2, function (i, v) {
      $('.step-club').append('<div class="stepOrder">' + v + '</div>');
    });
    //script for reordering all steps
    var sortValarr = [];
    $('.stepOrder').each(function () {
      sortValarr.push(parseInt($(this).text()));
    });
    var resultsort = sortValarr.sort(function (a, b) { return a - b });

    $('.stepOrder').remove();
    var stepsreorders = '';
    $.each(resultsort, function (i, v) {
      stepsreorders += '<div class="stepOrder">' + v + '</div>';
    });
    $('.step-club').append(stepsreorders);


  }



};

$(function () {

  /*Initialise default Html */
  $('.edit-form-slide-btn').click(function () {
    $(this).next().stop().slideToggle();
    $(this).find('i').toggleClass('fa-sort-desc').toggleClass('fa-sort-asc');
  });
  /*Initialise unique-step-id Html */
  $('[unique-step-id]').each(function () {
    if ($(this).attr('unique-step-id') == "0") {
      var stepUniqueId = formBuilder.guid();
      $(this).attr('unique-step-id', stepUniqueId);
    }
  })

  formBuilder.init();
  formBuilder.checkFormType();
  formBuilder.statusForm();

  /*Enquery Form*/
  /*formBuilder.enqCloneForms();
  formBuilder.enqGrpShowHide();
  formBuilder.enqGrpDelForms();*/

  formBuilder.enqCheckTagOptionType();
  formBuilder.enqShowHide();
  formBuilder.enqGrpShowHide();
  formBuilder.enqCloneForms();
  formBuilder.enqGrpDelForms();
  formBuilder.enqDelForms();
  formBuilder.saveEnqForms();

  /*MCQ Form*/
  formBuilder.mcqCheckTagOptionType();
  formBuilder.mcqShowHide();
  formBuilder.mcqGrpShowHide();
  formBuilder.mcqCloneForms();
  formBuilder.mcqDelForms();
  formBuilder.validateNumber();
  formBuilder.mcqGrpDelForms();
  formBuilder.saveMcqForms();
  /*User information*/
  formBuilder.userCheckTagOptionType();
  formBuilder.userShowHide();
  formBuilder.userAddField();
  formBuilder.userDelForms();

  /*Listing plans*/
  formBuilder.deleteFormByid();
  /*Club steps*/
  formBuilder.clubSteps();

  formBuilder.imageUpload();

});


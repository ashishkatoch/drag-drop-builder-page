$(document).ready(function(){
	var stylesheet = $('style[name=impostor_size]')[0].sheet;
	var rule = stylesheet.rules ? stylesheet.rules[0].style : stylesheet.cssRules[0].style;
	var setPadding = function(atHeight) {
		rule.cssText = 'border-top-width: '+atHeight+'px'; 
	};

		$('.enquiry-form-wrapper').sortable({
		placeholder: "ui-state-highlight",
		// animation: 500,
		//items: '.enq-single-group-container-plus-add,.enq-single-question-container-plus-add',
		items: '.enq-single-question-container-plus-add',
		helper: 'clone',
		axis: 'y',
		delay: 150,
	   'start':function(ev, ui) {
			   setPadding(ui.item.height());
			 $(this).attr('data-previndex', ui.item.parents('.enq-single-group-container-plus-add').index());
			   if($(ui.item).parents('.enq-single-group-container-plus-add').find('.enq-single-question-container-plus-add').length){
				//Case 1:Add plus button if only one question left
				// $(ui.item).parents('.enq-single-group-container-plus-add').find('.enq-single-question-container-plus-add').length==2
				// console.log($(ui.item).parents('.enq-single-group-container-plus-add').find('.enq-single-question-container-plus-add').length);
			   }			     
		},
		stop: function(ev, ui) {
		 if (
			 ($(ui.item).hasClass('enq-single-question-container-plus-add') && 
			 $(ui.item).parents().hasClass('enq-single-group-container-plus-add-inner-toggle'))
			 || 
			 ($(ui.item).hasClass('enq-single-group-container-plus-add') && 
			 !$(ui.item).parents().hasClass('enq-single-group-container-plus-add-inner-toggle'))
			){
			 }else{				
				 $(this).sortable("cancel");
			 }
	   },
	   update: function(ev, ui) {
			// gets the new and old index then removes the temporary attribute
			var oldStepIndex = $(this).attr('data-previndex');
			var newStepIndex = ui.item.parents('.enq-single-group-container-plus-add').index();
			/***check count of 
			drag place 
			**/
			//Case 1:Prevent dragging if only one question left		       
			var parentThisenq = $('body .enq-single-group-container-plus-add').eq(oldStepIndex);
			if(parentThisenq.find('.enq-single-question-container-plus-add').length==0){
				alert('You cannot drag. At least one question required in any step.');
				$(this).sortable('cancel');
				return false;
			}else if(parentThisenq.find('.enq-single-question-container-plus-add').length==1){
						parentThisenq.find('.addEnqField').remove();
						parentThisenq.find('.enqBtnName').text('+');
						parentThisenq.find('.delEnqField').addClass('addEnqField').removeClass('delEnqField'); 
						//Case 1a:Add plus button if only one question left
						var lastElementWithoutFieldsBTN = parentThisenq.find('.enq-single-question-container-plus-add').last().find('.addEnqField').length;
						if(lastElementWithoutFieldsBTN==0){
						parentThisenq.find('.enq-single-question-container-plus-add').last().find('.delEnqField').after('<a title="Add Question" href="javascript:void(0)" id="enquiry-next-button" class="button button-primary button-large addEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="enqBtnName">+</span></a>');
						}
			}else if(parentThisenq.find('.enq-single-question-container-plus-add').length>1){
				parentThisenq.find('.addEnqField').remove();
				parentThisenq.find('.enqBtnName').text('x');
				parentThisenq.find('.addEnqField').addClass('delEnqField').removeClass('addEnqField'); 
				//Case 1a:Add plus button and - minus button to the last question
				var lastElementWithoutFieldsBTN = parentThisenq.find('.enq-single-question-container-plus-add').last().find('.addEnqField').length;
				if(lastElementWithoutFieldsBTN==0){
					parentThisenq.find('.enq-single-question-container-plus-add').last().find('.delEnqField').after('<a title="Add Question" href="javascript:void(0)" id="enquiry-next-button" class="button button-primary button-large addEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="enqBtnName">+</span></a>');
				}
			}
			// Steps Bar Text replace with first Question Name
			$('body .enq-single-group-container-plus-add').each(function(){
				var flag = $(this).find('#enqgrporder').val();
				var targetQuestion = ($(this).find('.single-question-container .h5-accordion:first').text().trim());
				if(targetQuestion.length >55){
					targetQuestion = targetQuestion.substring(0,55)+" ...";
				}
				$(this).find('.h5-accordion:first').text('('+flag+')'+' '+targetQuestion);
			});

			//On First Question Change
			$('body .enq-single-group-container-plus-add').find('.single-question-inner-container .askque').unbind('keyup');
			$('body .enq-single-group-container-plus-add').each(function(){
				$(this).find('.single-question-inner-container .askque:first').on('keyup',function(){
					var quesVal = $(this).val();
					var flag = $(this).parents('.enq-single-group-container-plus-add').find('#enqgrporder').val();
					if(quesVal.length >55){
						quesVal = quesVal.substring(0,55)+" ...";
					}
					$(this).parents('.single-question-container').find('.h5-accordion').text(quesVal);
					$(this).parents('.enq-single-group-container-plus-add').find('.h5-accordion:first').text('('+flag+')'+' '+quesVal);
				});

				$(this).find('.single-question-inner-container .askque:not(:first)').on('keyup',function(){

					var quesVal = $(this).val().trim();
					console.log(quesVal);
					if(quesVal.length >55){
						quesVal = quesVal.substring(0,55)+" ...";
					}
					$(this).parents('.single-question-container').find('.h5-accordion').text(quesVal);
				});
			});



			/***check count of 
			drop place 
			**/
			var parentThisenq = $('body .enq-single-group-container-plus-add').eq(newStepIndex);
					// parentThisenq.find('.addEnqField').remove();
					// parentThisenq.find('.enqBtnName').text('+');
					// parentThisenq.find('.delEnqField').addClass('addEnqField').removeClass('delEnqField'); 
					//Case 1:Remove all plus button and add + button to the last element
					//Case2: Convert (+) button to (-) if only one step consist
					var countOfQuestions = parentThisenq.find('.enq-single-question-container-plus-add').length;		
					if(countOfQuestions==2){
						parentThisenq.find('.enq-single-question-container-plus-add ').find('.delEnqField').remove();
						parentThisenq.find('.enq-single-question-container-plus-add').find('.addEnqField').remove();
						parentThisenq.find('.enq-single-question-container-plus-add .single-question-container').after('<a href="javascript:void(0)" id="enquiry-next-button" class="button button-primary button-large delEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="enqBtnName">x</span></a>');
						parentThisenq.find('.enq-single-question-container-plus-add').last().find('.delEnqField').after('<a title="Add Question" href="javascript:void(0)" id="enquiry-next-button" class="button button-primary button-large addEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="enqBtnName">+</span></a>');	
					}else if(countOfQuestions>2){
						parentThisenq.find('.enq-single-question-container-plus-add').find('.addEnqField').remove();
						parentThisenq.find('.enq-single-question-container-plus-add').last().find('.delEnqField').after('<a title="Add Question" href="javascript:void(0)" id="enquiry-next-button" class="button button-primary button-large addEnqField"><span id="credit_card_loading"><img src="">Processing...</span><span class="enqBtnName">+</span></a>');	
					}			
					$(this).removeAttr('data-previndex');
		}

	});
	$('#aaweber_child').sortable({
		placeholder: "ui-state-highlight",			
		items: '.enq-single-group-container-plus-add',
		helper: 'clone',
		axis: 'y',
		delay: 150,
	   'start':function(ev, ui) {			
		setPadding(ui.item.height());
			$(this).attr('data-prevstepindex', ui.item.index());
		}, 
		stop: function(ev, ui) {
		},
	   update: function(ev, ui) {	
		var oldStepIndex = $(this).attr('data-prevstepindex');
		var newStepIndex = ui.item.index();
		var parentThisenq = $('body .enquiry-form');
		var countOfSteps = parentThisenq.find('.enq-single-group-container-plus-add').length;
		parentThisenq.find('.enq-single-group-container-plus-add .addGrpEnqField').remove();
		parentThisenq.find('.enq-single-group-container-plus-add .delGrpEnqField').last().after('<a href="javascript:void(0)" id="" class="button button-primary button-large addGrpEnqField"><span class="addgrpEnqbtn">Add Step</span></a>');
		if(parentThisenq.find('.enq-single-group-container-plus-add').last().find('.enq-single-group-container-plus-add-inner-toggle').attr('style') == 'display: none;'){
			parentThisenq.find('.enq-single-group-container-plus-add i').last().addClass('fa-sort-desc').removeClass('fa-sort-asc');
		}else{
			parentThisenq.find('.enq-single-group-container-plus-add  i').last().addClass('fa-sort-asc').removeClass('fa-sort-desc');
		}

		//lets give them numbering on bar as well as inside step Order Field
		var flag= 1;
		parentThisenq.find('.enq-single-group-container-plus-add').each(function(){
			$(this).find('#enqgrporder').val(flag);
			//show first question with number
			var firstQuestionText = $(this).find('.enq-single-question-container-plus-add:first #labe-question').val();
			if(firstQuestionText.length >55){
				firstQuestionText = firstQuestionText.substring(0,55)+" ...";
			}
			$(this).find('.parent-enqgrp-accordion .h5-accordion').text('('+flag+')'+' '+firstQuestionText);
			flag++;
		});

		$(this).removeAttr('data-prevstepindex');
	   }
	});

				//On First Question Change
				$('body .enq-single-group-container-plus-add').each(function(){
					$(this).find('.single-question-inner-container .askque:first').on('keyup',function(){
						var quesVal = $(this).val();
						var flag = $(this).parents('.enq-single-group-container-plus-add').find('#enqgrporder').val();
						if(quesVal.length >55){
							quesVal = quesVal.substring(0,55)+" ...";
						}else if(quesVal==''){
							quesVal = 'Field Setting';
						}
						$(this).parents('.single-question-container').find('.h5-accordion').text(quesVal);
						$(this).parents('.enq-single-group-container-plus-add').find('.h5-accordion:first').text('('+flag+')'+' '+quesVal);
					});
					$(this).find('.single-question-inner-container .askque:not(:first)').on('keyup',function(){

						var quesVal = $(this).val().trim();
						console.log(quesVal);
						if(quesVal.length >55){
							quesVal = quesVal.substring(0,55)+" ...";
						}
						$(this).parents('.single-question-container').find('.h5-accordion').text(quesVal);
					});
				});
		
})

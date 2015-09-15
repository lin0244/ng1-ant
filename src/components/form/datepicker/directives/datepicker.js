import template from "../templates/datepicker.html";

export default class DatePickerDirective {
	constructor($document, $filter, $timeout) {
		this.template = template;
		this.restrict = "E";

		this.scope = {
			minDate: "=",
			maxDate: "=",
			placeholder: "=",
			currentDate: "=ngModel",
			disabled: "="
		};

		this.$document = $document;
		this.$filter = $filter;
		this.$timeout = $timeout;
	}

	link(scope, element, attrs) {
		this.$scope = scope;
		scope.placeholder = scope.placeholder || "请选择日期";

		this.$document.on("click", function (evt) {
			var src = evt.srcElement ? evt.srcElement : evt.target;
			if ((scope.pop) && (!element[0].contains(src))) {
				scope.pop = false;
				scope.currentDate = scope.selectedDate;
				scope.$digest();
			}
		});
	}

	controller($scope) {
		var that = this;

		$scope.$watch("currentDate", function(newDate) {
			if (newDate) {
				$scope.selectedDate = newDate;
				$scope.currentDateStr = that.$filter('date')(newDate, "yyyy-MM-dd");
			}
		});

		$scope.showPop = function() {
			if (!$scope.disabled) {
				$scope.pop = true;
			}
		};

		$scope.dateClick = function() {
			that.$timeout(function() {
				$scope.currentDate = $scope.selectedDate;
			}, 0);
			$scope.pop = false;
		};
	}
}

DatePickerDirective.$inject = ["$document", "$filter", "$timeout"];
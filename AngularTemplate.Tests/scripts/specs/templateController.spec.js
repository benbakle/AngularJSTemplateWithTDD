describe("The Template Controller", function () {
    var _controller, _service, _$rootScope;
    var _controllerID = 'templateController';

    beforeEach(setup);

    it("Exists", function () {
        expect(templateController).toBeDefined();
    });

    describe("when initializing", function () {
        it("pass some tests", function () {
            expect(true).toBeTruthy();
        });
    });

    //:: METHODS FOR TESTS :://
    function setup() {
        module('app');
        module(mocks);
        inject(values);
    }

    //Subs the mockService for the development service
    function mocks($provide) {
        $provide.value('templateService', mockService());
    }

    //provides a list of values to be injected
    function values($controller, $rootScope, templateService) {
        _service = templateService;
        _$scope = $rootScope.$new();

        //spys before controller initializes in order to see the service(s) ran during init();
        spyOn(_service, 'getStuffByUsername').and.callThrough();

        _controller = $controller(_controllerID, { $scope: _$scope, templateService: _service });
    }
});

function mockService() {
    return {
        getStuffByUsername: function (username) {
            return {
                then: function (callback) {
                    callback({ data: _mockStuff() });
                }
            }
        }
        //editPayee: function () {
        //    return {
        //        then: function (callback) {
        //            callback({ data: "void" });
        //        }
        //    }
        //}
    }
}
function _mockStuff() {
    return [_mockStuff1(), _mockStuff2()];
}

function _mockStuff1() {
    return { Name: "Stuff1", Contact: "contact1", ImageUrl: "imgUrl1" };
}
function _mockStuff2() {
    return { Name: "Stuff2", Contact: "contact2", ImageUrl: "imgUrl2" };
}
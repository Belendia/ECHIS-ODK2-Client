import { Subject } from "rxjs/Subject";
import { environment } from '../../environments/environment';
import '../odk/odkTables.js';
import '../odk/odkCommon.js';

declare var odkTables: any;
declare var odkCommon: any;


export class ODKService {
    private LOG_TAG: string="SurveyService";
    private surveyIdentifierCode: number;

    surveyResultObservable = new Subject<{instanceId: string, savepoint_type: string}>();

    constructor() {
        if (environment.production) {
            odkCommon.registerListener(function() {
                this.actionFn();
            });
            this.actionFn();
        }
        //setup an observable
    }

    setSurveyIdentifierCode(value) {
        this.surveyIdentifierCode = value;
    }

    private actionFn() {
        var action = odkCommon.viewFirstQueuedAction();
        console.log('I',this.LOG_TAG + ' callback entered with action: ' + action);
      
        if (action === null || action === undefined) {
          // The queue is empty
          return;
        }
      
        var dispatchStr = JSON.parse(action.dispatchStruct);
        if (dispatchStr === null || dispatchStr === undefined) {
          console.log('E', this.LOG_TAG + ' Error: missing dispatch struct');
          odkCommon.removeFirstQueuedAction();
          return;
        }
      
        var actionType = dispatchStr['actionTypeKey'];
        switch (actionType) {
          case this.surveyIdentifierCode:
              this.handleSurveyResult(action, dispatchStr);
              break;
          default:
            console.log('E', this.LOG_TAG + ' Error: missing action type');
        }
        odkCommon.removeFirstQueuedAction();
    };
    
    private handleSurveyResult(action, dispatchStr) {
        var statusVal = action.jsonValue.status;
        if (statusVal !== -1) {
          console.log('I', this.LOG_TAG + ' Survey was cancelled.');
          return;
        }
      
        var result = action.jsonValue.result;
      
        //{instanceId: "d6ad6f6a-a3f6-48f4-abad-bc9ac5613438", savepoint_type: "COMPLETE"}
        this.surveyResultObservable.next(result);
    };

    editRowWithSurvey(tableName:string, formName: string, rowId: string) {
        let dispatchStruct = {};
        dispatchStruct['actionTypeKey'] = this.surveyIdentifierCode;
        odkTables.editRowWithSurvey(JSON.stringify(dispatchStruct), tableName, rowId, formName, null);
    }

    addRowWithSurvey ( tableId: string, formId: string, jsonMap) {
        let dispatchStruct = {};
        
        dispatchStruct['actionTypeKey'] = this.surveyIdentifierCode;
        odkTables.addRowWithSurvey(JSON.stringify(dispatchStruct),tableId, formId, null, jsonMap);
    }
    
    setSessionVariable(elementPath, jsonValue) {
        odkCommon.setSessionVariable(elementPath, JSON.stringify(jsonValue));
    }

    getSessionVariable(elementPath) {
        return odkCommon.getSessionVariable(elementPath);
    }
}
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AncService} from './anc.service';

@Injectable()
export class AncDetailResolverService implements Resolve<any> {

  constructor( private ancService: AncService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> | any {
      //get the hhm_id from route and query the odk table , anc_visit
       let mother_case_id = route.params['mother_case_id'];
        return new Promise((resolve, reject) => {
            this.ancService.getAncVisitsByCaseId(mother_case_id).subscribe(
                (result) => {
                   if(result)
                      resolve({ancVisits: result});
                   else
                     reject("anc visits not found");
                  },
                (error) => {
                  console.log(error);
                  reject(error);
                 }
              );
            });
    }
}

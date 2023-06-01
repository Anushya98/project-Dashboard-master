import React from 'react'
import BarChart from './bar-chart.js'

function Chart() {
  return (
    <div   class= "col-xl-12" style={{ marginTop:"30px" }}>
    <div class="card card-height-100">
        <div class="card-header d-flex align-items-center" >
            <h4 class="card-title flex-grow-1 mb-0"> Projects Overview</h4>
            </div>
             {/* <div>
    <button type="button" class="btn btn-soft-secondary btn-sm">
        ALL
    </button>
    <button type="button" class="btn btn-soft-secondary btn-sm">
        1M
    </button>
    <button type="button" class="btn btn-soft-secondary btn-sm">
        6M
    </button>
    <button type="button" class="btn btn-soft-secondary btn-sm">
        1Y
    </button>
        </div> */}
          
                {/* <!-- end card header --> */}
                <div className='headers'>
        <div class="card-header p-0 border-0 bg-white">
<        div class="row g-0 text-center">
           <div class="col-6 col-sm-4" style={{marginLeft:"15%"}}>
              <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1"><span class="counter-value" data-target="9851">9,851</span></h5>
            <p class="text-muted mb-0">Number of Projects</p>
        </div>
    </div>
    {/* <!--end col--> */}
    <div class="col-6 col-sm-4">
        <div class="p-3 border border-dashed border-start-0">
            <h5 class="mb-1"><span class="counter-value" data-target="1026">1,026</span></h5>
            <p class="text-muted mb-0">Active Projects</p>
        </div>
    </div>
 {/* <!--end col--> */}
</div>
{/* <!-- end card header --> */}
        <div class="card-body p-0 pb-2">
            <BarChart/>
                      </div>
                      </div>
                      </div>
                    </div>
                    </div>
  )
    }

export default Chart
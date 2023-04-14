function resolveAfter2Seconds() {
    return new Promise(resolve => {
      resolve('resolved');
    })
      
    //   setTimeout(() => {
    //     resolve('resolved');
    //   }, 2000);
    // });
  }
  
  async function asyncCall() {
    // console.log('calling');
    const result =  await resolveAfter2Seconds();
    console.log('calling');
    console.log(result);
    // Expected output: "resolved"
  }
  console.log("first");
  asyncCall();
  console.log("hi");
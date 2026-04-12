## 
## 1. 전략 내용
EmailJS 라이브러리를 사용하여 `index.html`의 문의 양식 데이터를 실제 이메일로 전송하는 기능을 구현했던 Footer의 .space-y-4로 된 헤더 섹션, 설명글 밑으로 들어갈 폼을 리액트 형식으로 만들어 구현하고 싶다.

## 2. 분석 내용
### 2.1. 대상 요소 (index.html)
- **Form ID**: `contact-form`
- **입력 필드**: 
  - `user_name`: 작성자 이름
  - `user_email`: 회신용 이메일 주소
  - `message`: 문의 내용

### 2.2. 계정 정보 (.env)
- **Service ID**: `service_gfdva76`
- **Template ID**: `template_kvju5vt`
- **Public Key**: `SqaOydDRsnxaLiXbu`

## 3. 구현 단계 (Action Plan)
1. **SDK 로드**: `index.html`의 `<head>` 영역에 EmailJS 공식 CDN 스크립트를 삽입합니다.
2. **SDK 초기화**: 로드된 스크립트 아래에 `emailjs.init("SqaOydDRsnxaLiXbu")` 코드를 추가하여 초기화합니다.
3. **이벤트 리스너 등록**:
   - `contact-form`의 `submit` 이벤트를 처리하는 스크립트를 작성합니다.
   - `event.preventDefault()`를 사용하여 기본 제출 동작을 방지합니다.
4. **이메일 전송 로직**:
   - `emailjs.sendForm("service_gfdva76", "template_kvju5vt", "#contact-form")`을 호출합니다.
5. **결과 처리**:
   - 전송 성공 시: "문의가 성공적으로 전송되었습니다." 알림 표시 및 폼 초기화.
   - 전송 실패 시: 에러 메시지 출력.

## index.html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
  <script type="text/javascript">
    (function() {
      emailjs.init({
        publicKey: "SqaOydDRsnxaLiXbu",
      });
    })();
  </script>
  <title>Document</title>
</head>
<body>
  <section class="contact-section">
  <h2>Contact Me</h2>
  <form id="contact-form">
    <div class="form-group">
      <label for="user_name">Name</label>
      <input type="text" id="user_name" name="user_name" placeholder="성함을 입력하세요" required>
    </div>

    <div class="form-group">
      <label for="user_email">Email</label>
      <input type="email" id="user_email" name="user_email" placeholder="답장받을 이메일을 입력하세요" required>
    </div>

    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" placeholder="내용을 입력하세요" required></textarea>
    </div>

    <div class="form-buttons">
      <button type="reset" class="btn-cancel">Cancel</button>
      <button type="submit" class="btn-submit">Submit</button>
    </div>
  </form>
</section>

<script type="text/javascript">
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // 버튼 상태 변경 (중복 클릭 방지)
    const submitBtn = this.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'Sending...';
    submitBtn.disabled = true;

    // emailjs.sendForm(serviceID, templateID, templatePrams)
    emailjs.sendForm('service_gfdva76', 'template_kvju5vt', this)
      .then(() => {
        alert('문의가 성공적으로 전송되었습니다.');
        this.reset();
      }, (error) => {
        alert('전송에 실패했습니다: ' + JSON.stringify(error));
      })
      .finally(() => {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      });
  });
</script>
</body>
</html>
---


## style.css
.contact-section {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: sans-serif;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, 
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* 패딩이 너비에 영향을 주지 않게 함 */
}

.form-buttons {
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel { background-color: #f0f0f0; }
.btn-submit { background-color: #333; color: white; }
---



